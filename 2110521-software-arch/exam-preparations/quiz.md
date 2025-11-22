### Microservice Deployment

**Q: Which of the following best describes deployment in microservices?**
A: A combination of process and architecture

**Q: What advantage does deploying a service as a container offer over a virtual machine (VM)?**
A: Containers generally have faster setup and more efficient resource utilization than VMs

**Q: Which deployment pattern is best described by “automatically runs enough instances of your service to handle incoming requests and charges based on the time taken and memory consumed”?**
A: Serverless deployment

**Q: In the context of Kubernetes, what is NOT a function of the control plane?**
A: Storing the cluster data in a NoSQL database

**Q: What is the primary benefit of using a service mesh in microservices architecture?**
A: It provides rule-based load balancing and simplifies traffic routing

**Q: What is a main difference between containers and VMs?**
A: Containers are more lightweight and share the OS

**Q: Which Kubernetes component is responsible for selecting a node to run a pod?**
A: Scheduler

**Q: A service mesh helps separate:**
A: Deployment from release

**Q: Which feature is NOT a core part of Istio’s functionality?**
A: Automatic code generation

**Q: What is a key drawback of AWS Lambda (serverless deployment)?**
A: Long-tail latency

---

### API Gateway & Edge Functions

**Q: Which one is not an API gateway responsibility?**
A: Message broking

**Q: Which one relates to the external API ownership model that the client teams own their API module layers and common layers?**
A: Backends for frontends pattern

**Q: What one is not the problem for the client app outside firewall to connect to microservices?**
A: Single API request

**Q: Which one is not supported by KONG API gateway?**
A: API composition

**Q: What is not a duty of the Edge function?**
A: Data aggregation

**Q: Which one is not the place we implement the authentication function?**
A: At the backend Microservices

**Q: Which one is not a drawback of using API gateway for external API pattern?**
A: The client development teams will have additional modules under their control.

**Q: Which one effectively helps the API gateway be more reliable?**
A: Run multiple instance of gateway behind a load balancer

**Q: In designing an API gateway, which option is incorrect about using synchronous vs. asynchronous I/O?**
A: In asynchronous I/O API gateway, the single loop event thread is still blocked until the event handler finishes its job.

---

### Testing Microservices

**Q: Which one of the four phases of an automated test might be omitted?**
A: Teardown

**Q: Which one is introduced to replace the SUT’s (System Under Test) dependencies?**
A: Test doubles

**Q: What type of test is an acceptance test for an individual service?**
A: Component tests

**Q: Which one refers to a set of examples that defines the interaction between a consumer and a provider?**
A: Contract

**Q: Which one is considered a solitary unit test?**
A: Domain services

**Q: What type of test is related to the strategy to test the individual adapter classes that implement the communication?**
A: Integration tests

**Q: According to the given figure (context implies persistence layer), what number is related to the Persistence test?**
A: 3

**Q: What is the test automation framework for Gherkin specifications called?**
A: Cucumber

**Q: Which one is the incorrect phase mapping to the given scenario keyword?**
A: @And — The execute phase

**Q: Which statement is not related to the End-to-end test?**
A: The test should be tested many times as they are fast, reliable, and cheap.

---

### CQRS (Command Query Responsibility Segregation)

**Q: Which one in the following option is not the benefit of using the CQRS pattern?**
A: Simplify the complexity in implement querying logic.

**Q: Which one is not a critical issue in designing a data access module?**
A: Idempotent event handlers

**Q: What motivation encourages using the CQRS pattern in querying data instead of the API composition pattern?**
A: All of these motivations are correct. (Examples: Service might not support bulk fetch, in-memory join is inefficient, API composition consumes excessive traffic).

**Q: What is not a factor that needs to be considered in implementing a particular query operation?**
A: The architecture is brokerless or broker-based.

**Q: What is true about how to write efficient aggregation logic?**
A: API composer should use a proactive programming model.

**Q: Which one is not a querying pattern?**
A: Polling Publisher

**Q: Which of the following scenarios may not be a good decision for CQRS Query-side view stores?**
A: Query-based lookup for JSON object → Use a RDBMS such as MySQL

**Q: What is an option in deciding which component in your architecture is the query operation’s API composer?**
A: All of these options are possible. (API gateway, Client, or Stand-alone service).

**Q: Which one is not a drawback of the API composition pattern?**
A: Implementing is more complex comparison to CQRS.

**Q: Which one is not a participant in the API composition pattern?**
A: A querying broker

---

### gRPC and Messaging

**Q: What is not a benefit of using gRPC?**
A: Takes less work for JavaScript clients comparison to REST/JSON-based APIs

**Q: Which kind of applications may you decide to use RabbitMQ over Kafka and WHY?**
A: Task queues and workflow-based applications needing reliable delivery

**Q: What is not a characteristic of Brokerless architecture in an Asynchronous messaging pattern?**
A: Availability is reduced comparison to Broker-based architecture.

**Q: Which one in these following options is not synchronous communication mechanisms?**
A: AMQP

**Q: Why is fair-dispatching introduced in RabbitMQ?**
A: Different consumers may work on different speed.

**Q: If all workers are interested in the same thing, which kind of queue should we use?**
A: Queue with exchange type is fanout

**Q: From this command, `docker run -d --name some-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3`, which choice is INCORRECT?**
A: The container name is rabbitmq:3 (Note: The image is rabbitmq:3; the name is "some-rabbit").

**Q: If we would like our kitchen microservices to cook for specific food types, which kind of queue can we use in RabbitMQ?**
A: Queue with exchange type is direct with the use of routing keys

**Q: Which one is incorrect about the Circuit Breaker pattern?**
A: Included in the five groups of communication patterns under Discovery topic.

**Q: Which one is incorrect about RabbitMQ?**
A: RabbitMQ supports the replay messages

**Q: Which one is not a characteristic of the invocation-based IPC mechanism?**
A: A client may send requests to many services in a command.

**Q: Which issue is not necessary for an Asynchronous messaging pattern?**
A: How to design the Circuit breaker pattern when a service is not responding?

**Q: Which one does not relate to REST?**
A: Binary messages in the Protocol Buffers format using HTTP/2

---

### DDD (Domain-Driven Design)

**Q: What are the "positions" in the ADR's (Architecture Decision Record) template of Tyree and Akerman used for?**
A: Record alternatives, other possible approaches/solutions

**Q: Why is ADR important?**
A: To capture key architectural decisions with context and reasoning

**Q: If a bounded context provided an XML schema of its provided data for other bounded contexts to use, which context map relationship is used?**
A: Published Language

**Q: When we need to work with a big ball of mud system, which context map's technique should we use?**
A: Anticorruption Layer

**Q: List at least 5 keywords related to DDD**
A: Bounded Context, Ubiquitous Language, Aggregate, Entity, Value Object

**Q: In DDD, what is the main responsibility of an "Aggregate Root"?**
A: To enforce invariants (business rules) for all objects within the Aggregate boundary

**Q: What is the key difference between an Entity and a Value Object?**
A: An Entity has a unique identity that persists over time, while a Value Object is defined by its attributes

**Q: What is the designated role of a Repository in DDD?**
A: To provide a collection-like interface for accessing and persisting Aggregate Roots

**Q: Which of the following is considered part of DDD's "Strategic Design"?**
A: Defining Bounded Contexts and their relationships (Context Mapping)

**Q: A Domain Event represents:**
A: Something significant that has already happened in the domain

**Q: When is an "Anti-Corruption Layer" (ACL) pattern most useful?**
A: When integrating with a legacy or external system whose model is messy or undesirable

**Q: What best describes the role of an Application Service?**
A: To orchestrate calls to the domain model (Aggregates and Domain Services) to fulfill a use case

**Q: In DDD, what is the primary purpose of a Factory?**
A: To encapsulate the logic of creating complex objects and Aggregates, ensuring they are in a valid state

**Q: A value object in DDD is best characterized by:**
A: Its immutability and equality by values rather than identity
