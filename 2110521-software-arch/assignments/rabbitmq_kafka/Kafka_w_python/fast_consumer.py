import threading, time, json
from kafka import KafkaConsumer

BOOTSTRAP_SERVERS = 'localhost:9092'
TOPIC_NAME = 'my-topic'
GROUP_ID = 'test-group'
NUM_CONSUMERS = 4

def consume_in_parallel(cid):
    consumer = KafkaConsumer(
        TOPIC_NAME,
        bootstrap_servers=BOOTSTRAP_SERVERS,
        group_id=GROUP_ID,
        auto_offset_reset='earliest',
        value_deserializer=lambda v: json.loads(v.decode('utf-8'))
    )

    count = 0
    start = time.time()

    for message in consumer:
        count += 1
        if count >= 100000 // NUM_CONSUMERS:  # stop after consuming share
            break

    end = time.time()
    print(f"[{cid}] Consumed {count} msgs in {end - start:.2f} sec "
          f"({count / (end - start):.2f} msg/sec)")
    consumer.close()

if __name__ == "__main__":
    threads = []
    for i in range(NUM_CONSUMERS):
        t = threading.Thread(target=consume_in_parallel, args=(f"C{i+1}",))
        threads.append(t)
        t.start()
    for t in threads:
        t.join()
