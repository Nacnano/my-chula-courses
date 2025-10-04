import pika, time, sys, json

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='test-queue')

num_messages = 100000
msg_size_kb = float(sys.argv[1]) if len(sys.argv) > 1 else 0.1
payload = "X" * int(msg_size_kb * 1024)

print(f"Sending {num_messages} RabbitMQ messages of {msg_size_kb}KB...")

start = time.time()
for i in range(num_messages):
    message = json.dumps({'id': i, 'payload': payload})
    channel.basic_publish(exchange='', routing_key='test-queue', body=message)

end = time.time()
print(f"Finished sending in {end - start:.2f} sec")
print(f"Throughput: {num_messages / (end - start):.2f} msg/sec")

connection.close()
