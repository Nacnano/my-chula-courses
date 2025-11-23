### Part 1: The Decomposition Process & System Operations

1.  **What are the three steps in defining a microservice architecture?**
    Identify system operations, Identify services, Define service APIs and collaborations.
2.  **What is a "System Operation"?**
    An abstraction of a request that the application must handle (representing an external request).
3.  **What is the starting point for identifying system operations?**
    Functional requirements and user stories.
4.  **In the FTGO example, which actor initiates the `noteUpdatedLocation()` command?**
    The Courier.
5.  **What are system operations derived from?**
    A high-level domain model and the application's requirements.

### Part 2: Decomposition by Business Capability

6.  **Definition: What is a "Business Capability"?**
    Something a business does to generate value (e.g., "Order Management" or "Underwriting").
7.  **Is "Decomposition by Business Capability" based on technical or business concepts?**
    Business concepts.
8.  **Why is the "Business Capability" architecture considered relatively stable?**
    Because the fundamental "what" of a business changes much less frequently than the "how" (implementation).
9.  **In the FTGO example, "Courier Management" falls under which top-level capability?**
    Supplier Management.
10. **What is a potential downside of defining service collaboration using business capabilities?**
    Some decompositions result in inefficient interprocess communication or excessive complexity in specific services.

### Part 3: Decomposition by Subdomain (DDD)

11. **What does DDD stand for?**
    Domain-Driven Design.
12. **What are the two DDD concepts most useful for microservice decomposition?**
    Subdomains and Bounded Contexts.
13. **Definition: What is a "Bounded Context"?**
    The specific scope within which a particular domain model is valid.
14. **How do Subdomains relate to Services in this architecture?**
    Each subdomain maps to a specific service, and each service has its own domain model.
15. **How are subdomains identified?**
    By analyzing the business and identifying different areas of expertise.

### Part 4: The "God Class" Problem

16. **What is a "God Class"?**
    A bloated class that knows too much, does too much, and is used throughout the application (e.g., a massive `Order` class).
17. **Why is a God Class an obstacle to decomposition?**
    It creates tight coupling between different aspects of the system, making it hard to split into services.
18. **How does Domain-Driven Design (DDD) solve the God Class problem?**
    By breaking the single class into multiple specific models (e.g., `Order` becomes `DeliveryOrder`, `KitchenTicket`, `AccountingRecord`) inside different Bounded Contexts.
19. **In the FTGO example, why was the `Order` class considered a God Class?**
    Because it handled unrelated concerns like billing, delivery location, kitchen prep, and customer preferences all in one place.

### Part 5: Service Collaboration & Obstacles

20. **What is a common solution to reduce Network Latency in microservices?**
    Implementing a **Batch API** to fetch multiple objects in a single round trip.
21. **What is the drawback of using synchronous communication (like REST) between services?**
    It reduces availability (if one service is down, the caller may fail).
22. **What communication mechanism is recommended to eliminate tight coupling and improve availability?**
    Asynchronous messaging (using a message broker).
23. **Why is maintaining data consistency harder in microservices than in a monolith?**
    Because you cannot use a single ACID database transaction across multiple services.
24. **What pattern is used to manage distributed transactions across services?**
    The **Saga** pattern.
25. **What does CQRS stand for?**
    Command Query Responsibility Segregation.
26. **What pattern is used to implement complex queries that require data from multiple services?**
    The API Composition pattern (or CQRS).

### Part 6: Application to FTGO (Case Study)

27. **In the `createOrder()` operation, which service acts as the orchestrator (entry point)?**
    The Order Service.
28. **Which service would handle `verifyConsumerDetails()`?**
    The Consumer Service.
29. **Why does the Kitchen Service need its own domain model of an Order (often called a Ticket)?**
    Because the kitchen only cares about food items and prep time, not payment or delivery address.
30. **Ultimately, should services be organized around technical layers (UI/DB) or business concerns?**
    Business concerns.
