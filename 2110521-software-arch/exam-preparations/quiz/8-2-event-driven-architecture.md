### Topic: Synchronous vs. Asynchronous Communication

1.  **Question:** In synchronous communication (like REST), what does the client do after sending a request?
    **Answer:** It blocks (waits) until it receives a response.

2.  **Question:** What is a major risk of having a deep web of synchronous service interactions?
    **Answer:** Cascading failures (a small availability issue becomes a widespread outage).

3.  **Question:** In asynchronous communication, what assumption does the client make about the reply?
    **Answer:** It assumes the reply will not be received immediately (fire-and-forget).

4.  **Question:** What is the primary benefit of splitting software into asynchronous flows?
    **Answer:** It decouples services and compartmentalizes problems.

### Topic: Commands, Events, and Queries

5.  **Question:** Which interaction type represents a request for an action to be performed in the future?
    **Answer:** Command.

6.  **Question:** Which interaction type represents a fact that happened in the past?
    **Answer:** Event.

7.  **Question:** Which interaction type leaves the system state unchanged (has no side effects)?
    **Answer:** Query.

8.  **Question:** Do **Events** expect a response from the receiver?
    **Answer:** No.

9.  **Question:** Do **Queries** expect a response?
    **Answer:** Always.

10. **Question:** What are the two "hats" (functions) that an event wears?
    **Answer:** Notification and Replication (or State Transfer).

11. **Question:** Which interaction type implies high coupling because the sender tells a specific service what to do?
    **Answer:** Command.

### Topic: Architecture Patterns (Broker & Event Collaboration)

12. **Question:** In a **Broker-based** architecture, does the sender need to know the location or identity of the receiver?
    **Answer:** No.

13. **Question:** In the **Event Collaboration** pattern, who owns the entire business process workflow?
    **Answer:** No single service owns the whole process; services own small parts of state transitions.

14. **Question:** In the slide examples, what specific technology is used as the Message Broker?
    **Answer:** Apache Kafka.

15. **Question:** In the "Request-Driven" Order System example, why does the Shipping service fail if the Customer service is down?
    **Answer:** Because Shipping relies on a synchronous call to Customer service to get the address.

16. **Question:** In the "Event-Driven" Order System example, how does the Shipping service get the customer's address without calling the Customer service?
    **Answer:** By listening to `CustomerUpdated` events and replicating the data locally.

### Topic: Choreography vs. Orchestration

17. **Question:** Which workflow pattern involves a central "process manager" or controller?
    **Answer:** Orchestration.

18. **Question:** Which workflow pattern is described as "pluggable," allowing you to add new services without changing existing ones?
    **Answer:** Choreography.

19. **Question:** What is the main downside of Orchestration described in the slides?
    **Answer:** The model is tightly coupled to the controller/central service.

20. **Question:** What is the main advantage of Orchestration?
    **Answer:** The workflow is written down in one place, making it easier to reason about.

21. **Question:** In a Choreographed system, how is the business process defined?
    **Answer:** By the collective state transitions of individual services reacting to events.

### Topic: Stream Processing & State

22. **Question:** What is the difference between Stateful and Stateless stream processing regarding external data?
    **Answer:** Stateful processing keeps local data copies (via events); Stateless processing might need to call external services for data.

23. **Question:** In the context of Kafka mentioned in the slides, which library implies keeping state (a table)?
    **Answer:** KTable.

24. **Question:** When using events for **Data Replication**, what can a service do with the replicated data?
    **Answer:** It can query the data locally without network calls.

### Topic: Hybrid/Mixed Architectures

25. **Question:** In a mixed protocol architecture, which part of the system typically typically uses synchronous REST APIs?
    **Answer:** The User Interface (Front-facing services).

26. **Question:** How are state changes propagated from the front-end services to the back-end services in the hybrid example?
    **Answer:** They are journaled to Kafka as events.

27. **Question:** How are Legacy Applications integrated into the event loop in the provided architecture diagram?
    **Answer:** Via the Connect API (importing data).

28. **Question:** In the visual summary of "Event-Driven," what does the Order Service do instead of calling the Logic block directly?
    **Answer:** It broadcasts "Widget-Ordered" (what it did).

29. **Question:** Why is "Replication" via events considered better for availability than synchronous queries?
    **Answer:** Because the consuming service can still function even if the data-owning service is offline.

30. **Question:** "Queries don't span contexts; they use a local copy." This describes which architectural approach?
    **Answer:** Event-Driven (specifically with State Transfer).
