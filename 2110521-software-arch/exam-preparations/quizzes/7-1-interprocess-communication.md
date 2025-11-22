### Part 1: Fundamentals & Interaction Styles

**1. In a monolithic architecture, components communicate via language-level method calls. How do they communicate in a microservice architecture?**
**Answer:** Interprocess Communication (IPC) over the network.

**2. What are the two dimensions used to categorize interaction styles?**
**Answer:**

1. One-to-one vs. One-to-many
2. Synchronous vs. Asynchronous

**3. Which interaction style involves a client sending a request to a service but not expecting a reply?**
**Answer:** One-way notification.

**4. Which interaction pattern allows a message to be consumed by zero or more interested services?**
**Answer:** Publish/subscribe.

**5. What does IDL stand for, and why is it important?**
**Answer:** Interface Definition Language. It is important for defining the API contract to hide implementation details and allow services to evolve.

### Part 2: Message Formats & Synchronous Patterns (RPI)

**6. What is the main trade-off between Text-based formats (JSON/XML) and Binary formats (ProtoBuf/Avro)?**
**Answer:** Text-based formats are human-readable but verbose; Binary formats are compact and efficient but not human-readable.

**7. In the REST architectural style, what concept represents a business object like a Customer or Product?**
**Answer:** A Resource.

**8. What is the most popular IDL used for defining REST APIs?**
**Answer:** The Open API Specification (formerly Swagger).

**9. Name one major drawback of using REST/HTTP synchronous communication.**
**Answer:** Reduced availability (both client and service must be online) OR clients must know the specific network locations.

**10. What underlying network protocol does gRPC use to enable features like bidirectional streaming?**
**Answer:** HTTP/2.

**11. What is the default IDL and serialization format used by gRPC?**
**Answer:** Protocol Buffers.

### Part 3: Handling Failures (Reliability)

**12. In a synchronous request, what happens if a service waits indefinitely for a response from an unresponsive provider?**
**Answer:** It blocks the thread, potentially leading to cascading failures across the system.

**13. Which design pattern prevents a network or service failure from cascading to other services by failing immediately after a threshold is reached?**
**Answer:** The Circuit Breaker pattern.

**14. Aside from returning an error, what is a user-friendly strategy for a client when a remote service fails?**
**Answer:** Returning a **fallback value** (e.g., default data or cached data).

**15. What are the two main components required to solve the "Circuit Breaker" implementation?**
**Answer:**

1. An RPI proxy to handle unresponsive services.
2. A recovery strategy (fallback).

### Part 4: Service Discovery

**16. Why is hardcoding IP addresses (e.g., 10.232.23.1) impossible in a modern cloud-based microservice environment?**
**Answer:** Because IP addresses are dynamically assigned and change whenever service instances start, stop, or scale.

**17. What is the key component acting as a database of network locations for service instances?**
**Answer:** The Service Registry.

**18. What are the two main patterns for implementing Service Discovery?**
**Answer:** Client-side discovery and Server-side (or Platform-provided) discovery.

**19. In the "Platform-provided service discovery" pattern (e.g., Kubernetes), what entity is responsible for routing the request to an available instance?**
**Answer:** The deployment platform (via a router or load balancer).

### Part 5: Asynchronous Messaging

**20. What are the three common types of messages?**
**Answer:** Document, Command, and Event.

**21. Which channel type represents a one-to-one interaction where a message is delivered to exactly one consumer?**
**Answer:** Point-to-point channel.

**22. Which architectural style involves services sending messages directly to each other without an intermediary?**
**Answer:** Brokerless architecture (e.g., ZeroMQ).

**23. Name two popular open-source Message Brokers mentioned in the slides.**
**Answer:** RabbitMQ and Apache Kafka (ActiveMQ is also correct).

**24. What is a primary benefit of using a Broker-based architecture over a Brokerless one?**
**Answer:** **Message Buffering** (consumers don't need to be online immediately) or **Loose Coupling** (sender doesn't need to know the consumer's location).

**25. What is a potential drawback of using a Message Broker?**
**Answer:** It can become a performance bottleneck or a single point of failure; it also increases operational complexity.

### Part 6: Advanced Messaging Implementation

**26. Since messaging is inherently one-way, what two things must a request message contain to enable a Request/Response style?**
**Answer:** A **Reply Channel** (where to send the answer) and a **Correlation ID** (to match the answer to the request).

**27. When multiple instances of a service consume from the same channel, network delays can cause messages to be processed out of order. How is this solved?**
**Answer:** By using **Sharded (Partitioned) Channels**.

**28. In a sharded channel, how does the system ensure related messages (e.g., for the same Order ID) are processed in order?**
**Answer:** By using a **Shard Key** (e.g., OrderID) so all related messages go to the same shard, which is read by a single consumer instance.

**29. What concept describes a message handler that can safely process the same message multiple times without changing the outcome?**
**Answer:** Idempotency.

**30. How can a consumer technically detect and discard duplicate messages?**
**Answer:** By recording the IDs of processed messages in a dedicated database table (Dedup/Processed_Message table) and checking new messages against it.
