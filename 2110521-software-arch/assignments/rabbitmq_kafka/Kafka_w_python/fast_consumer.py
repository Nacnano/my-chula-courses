import threading
from kafka import KafkaConsumer
import json
import time

# --- Configuration ---
BOOTSTRAP_SERVERS = 'localhost:9092'
TOPIC_NAME = 'my-topic'
GROUP_ID = 'high-speed-group' # All consumers share this ID
NUM_CONSUMERS = 3

def consume_in_parallel(consumer_id: str):
    """A function to be run by each consumer thread."""
    print(f"[{consumer_id}] Starting consumer for group '{GROUP_ID}'...")
    
    try:
        # Each thread creates its own KafkaConsumer instance.
        # They all share the same group_id.
        consumer = KafkaConsumer(
            TOPIC_NAME,
            bootstrap_servers=BOOTSTRAP_SERVERS,
            group_id=GROUP_ID,
            auto_offset_reset='earliest', # Start reading at the earliest message
            consumer_timeout_ms=10000,    # Stop if no messages for 10 seconds
            value_deserializer=lambda v: json.loads(v.decode('utf-8'))
        )

        print(f"[{consumer_id}] is now listening...")

        # Poll for messages. Kafka automatically assigns partitions to this consumer.
        for message in consumer:
            # The 'partition' field shows which partition this message came from.
            # You will see different consumers handling different partitions.
            print(f"[{consumer_id}] Working on Partition {message.partition} | Received: {message.value}")
            # Simulate some processing time
            time.sleep(0.5)
        
        print(f"[{consumer_id}] Timed out. Shutting down.")

    except Exception as e:
        print(f"[{consumer_id}] An error occurred: {e}")
    finally:
        if 'consumer' in locals():
            consumer.close()
            print(f"[{consumer_id}] Consumer closed.")


if __name__ == "__main__":
    threads = []
    print(f"--- Starting {NUM_CONSUMERS} consumers in group '{GROUP_ID}' ---")

    # Create and start a thread for each consumer instance
    for i in range(NUM_CONSUMERS):
        thread = threading.Thread(target=consume_in_parallel, args=(f"Consumer-{i+1}",))
        threads.append(thread)
        thread.start()

    # Wait for all threads to complete their work
    for thread in threads:
        thread.join()
        
    print("--- All consumer threads have finished ---")

