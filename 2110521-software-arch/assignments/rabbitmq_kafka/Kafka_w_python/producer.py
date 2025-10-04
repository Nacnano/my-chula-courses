from kafka import KafkaProducer
import json
import time

# This address should now work because of the port mapping 
# and the advertised listener setting in docker-compose.
bootstrap_servers = ['localhost:9092']
topic_name = 'my-topic'

try:
    # 1. Create a KafkaProducer instance
    producer = KafkaProducer(
        bootstrap_servers=bootstrap_servers,
        # Encode messages as JSON
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    print(f"Successfully connected to Kafka broker at {bootstrap_servers}")

    # 2. Send messages
    for i in range(5):
        message = {'number': i, 'message': f'This message comes from a Python producer for Docker! Message {i}'}
        
        print(f"Sending message: {message}")
        
        # Send the message to the specified topic
        future = producer.send(topic_name, value=message)
        
        try:
            # Block until the message is sent and get metadata
            record_metadata = future.get(timeout=10)
            print(f"Message sent to topic '{record_metadata.topic}' "
                  f"partition {record_metadata.partition} "
                  f"with offset {record_metadata.offset}")
        except Exception as e:
            print(f"Error sending message: {e}")
            
        time.sleep(1)

finally:
    # 3. Flush and close the producer
    if 'producer' in locals() and producer.bootstrap_connected():
        producer.flush()
        print("All messages flushed.")
        producer.close()
        print("Producer closed.")

