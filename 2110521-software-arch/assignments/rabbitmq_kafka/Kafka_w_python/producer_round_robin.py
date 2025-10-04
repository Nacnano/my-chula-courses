# producer_round_robin.py
from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

topic_name = 'my-topic'
num_messages = 20

print(f"Sending {num_messages} messages to topic '{topic_name}'...")
print("The producer will automatically distribute these across all available partitions.")

for i in range(num_messages):
    message = {'message_id': i, 'distribution_method': 'default_round_robin'}
    
    # By NOT specifying a 'key' or 'partition', kafka-python automatically
    # cycles through the partitions for us. This is the key to load balancing.
    producer.send(topic_name, value=message)
    
    print(f"Sent message #{i}")
    time.sleep(0.1)

# .flush() ensures all buffered messages are sent before the script exits
producer.flush()
producer.close()

print("Finished sending all messages.")
