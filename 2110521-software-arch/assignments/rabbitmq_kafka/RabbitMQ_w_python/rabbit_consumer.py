import pika, threading, time, json

NUM_CONSUMERS = 4

def consume(cid):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='test-queue')

    count = 0
    start = time.time()

    def callback(ch, method, properties, body):
        nonlocal count, start
        count += 1
        if count >= 100000 // NUM_CONSUMERS:
            end = time.time()
            print(f"[{cid}] Consumed {count} msgs in {end - start:.2f} sec "
                  f"({count / (end - start):.2f} msg/sec)")
            ch.stop_consuming()

    channel.basic_consume(queue='test-queue', on_message_callback=callback, auto_ack=True)
    channel.start_consuming()
    connection.close()

if __name__ == "__main__":
    threads = []
    for i in range(NUM_CONSUMERS):
        t = threading.Thread(target=consume, args=(f"C{i+1}",))
        threads.append(t)
        t.start()
    for t in threads:
        t.join()
