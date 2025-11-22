### Section 1: Basic Concepts & Terminology

1.  **What is the primary protocol supported by RabbitMQ?**
    - AMQP (Advanced Message Queuing Protocol).
2.  **Does RabbitMQ operate on a Push model or a Pull model?**
    - Push model.
3.  **In RabbitMQ jargon, what is the "Producer"?**
    - A program that sends messages.
4.  **In RabbitMQ jargon, what is the "Consumer"?**
    - A program that waits to receive messages.
5.  **What is the buffer that stores messages inside RabbitMQ called?**
    - A Queue.
6.  **What Python library is recommended in the slides to act as a RabbitMQ client?**
    - Pika.
7.  **What is the default port for RabbitMQ messaging traffic?**
    - 5672.

### Section 2: Work Queues & Reliability

8.  **In a "Work Queue" pattern, how does RabbitMQ dispatch messages to workers by default?**
    - Round-robin dispatching.
9.  **What assumption does the Work Queue pattern make about task delivery?**
    - Each task is delivered to exactly one worker.
10. **If RabbitMQ crashes, messages are lost. What two things must be done to prevent this?**
    - Mark the queue as `durable=True` AND mark messages as persistent (`delivery_mode=2`).
11. **What parameter makes a queue survive a server restart?**
    - `durable=True`.
12. **What is the mechanism used to tell RabbitMQ that a consumer has finished processing a message so it can be deleted?**
    - Message Acknowledgment (Ack).
13. **What happens to a message if a worker dies (connection closes) without sending an Ack?**
    - RabbitMQ will re-queue the message and deliver it to another consumer.
14. **What is "Fair Dispatch"?**
    - Telling RabbitMQ not to send a new message to a worker until it has processed and acknowledged the previous one.
15. **Which code method implements Fair Dispatch (Quality of Service)?**
    - `channel.basic_qos(prefetch_count=1)`.

### Section 3: Exchanges & Routing Patterns

16. **In the full messaging model, producers never send messages directly to a queue. Where do they send them?**
    - An Exchange.
17. **Which Exchange type broadcasts a message to _all_ known queues?**
    - Fanout.
18. **In the "Publish/Subscribe" pattern, how do we ensure a consumer gets a fresh, empty queue that is deleted when they disconnect?**
    - Declare the queue with `exclusive=True` (and often let the server generate a random name).
19. **Which Exchange type routes messages based on an exact match between the routing key and binding key?**
    - Direct.
20. **Which Exchange type routes messages based on patterns (using wildcards)?**
    - Topic.
21. **In a Topic exchange, what does the `*` (star) wildcard represent?**
    - It substitutes for exactly one word.
22. **In a Topic exchange, what does the `#` (hash) wildcard represent?**
    - It substitutes for zero or more words.
23. **If a queue is bound with the key `kern.*`, would it receive a message with the routing key `kern.critical.error`?**
    - No (because `*` only matches one word).

### Section 4: RabbitMQ vs. Apache Kafka

24. **Does Kafka use a Push model or a Pull model?**
    - Pull model.
25. **Between RabbitMQ and Kafka, which one is described as the "Smart Broker, Dumb Consumer"?**
    - RabbitMQ.
26. **How does Kafka organize messages for scaling (unlike RabbitMQ's simple queues)?**
    - Topics are split into **Partitions**.
27. **What happens to a message in RabbitMQ after it is consumed and acknowledged?**
    - It is deleted.
28. **How does Kafka handle message retention differently than RabbitMQ?**
    - Kafka retains messages for a set period (policy) or size, regardless of consumption, allowing for message replay.
29. **Which system is better suited for "Complex Routing" logic?**
    - RabbitMQ.
30. **Which system is better suited for massive throughput, stream processing, and event sourcing?**
    - Apache Kafka.
