from kafka import KafkaProducer
import json, time, sys

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

topic_name = 'my-topic'
num_messages = 100000  # 100K messages

# Argument for message size in KB (default = 0.1KB)
msg_size_kb = float(sys.argv[1]) if len(sys.argv) > 1 else 0.1
payload = "X" * int(msg_size_kb * 1024)  # fill with dummy characters

print(f"Sending {num_messages} messages of size {msg_size_kb} KB to topic '{topic_name}'...")

start = time.time()

for i in range(num_messages):
    message = {'id': i, 'payload': payload}
    producer.send(topic_name, value=message)

producer.flush()
end = time.time()

print(f"Finished sending {num_messages} messages in {end - start:.2f} sec")
print(f"Throughput: {num_messages / (end - start):.2f} msg/sec")

producer.close()
