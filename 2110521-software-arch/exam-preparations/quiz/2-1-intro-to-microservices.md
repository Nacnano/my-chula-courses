### Section 1: Fundamental Concepts

**1. How does Bass et al. define software architecture?**
It is the set of structures needed to reason about the system, comprising software elements, relations among them, and properties of both.

**2. What is the primary goal of software architecture?**
To satisfy the non-functional requirements (also known as quality attributes or -ilities).

**3. What are three examples of "Quality Attributes" mentioned?**
Maintainability, Testability, and Deployability.

**4. What is the definition of a Monolithic Architecture?**
An architectural style that structures the application as a single executable component.

**5. Why is a Monolithic Architecture initially good for startups?**
It is simple to develop, test, and deploy when the application is small.

**6. What is the term used to describe the state where a monolith becomes too large and complex to manage?**
Monolithic Hell.

**7. What is the "Modern Triad" of software development mentioned in the slides?**
Process (DevOps), Organization (Small autonomous teams), and Architecture (Microservices).

### Section 2: The Scale Cube (X, Y, Z Axis)

**8. What does the X-Axis of the Scale Cube represent?**
Horizontal duplication (running multiple identical copies of the monolith behind a load balancer).

**9. What does the Z-Axis of the Scale Cube represent?**
Data partitioning (routing requests based on an attribute, like User ID or location).

**10. What does the Y-Axis of the Scale Cube represent?**
Functional decomposition (splitting the application into services).

**11. Which axis of the Scale Cube corresponds to Microservices?**
The Y-Axis.

**12. Why is X-axis scaling insufficient for complex applications?**
It increases capacity but does not reduce the complexity of the codebase (you are just cloning the same mess).

### Section 3: Microservices Definition & Characteristics

**13. How is Microservice Architecture defined in the slides?**
A set of loosely coupled services organized around business capabilities.

**14. What is the key characteristic of a service’s data in this architecture?**
Data is private to the service (Database per Service).

**15. What famous phrase by Fred Brooks is used to describe Microservices?**
"No Silver Bullet" (meaning it solves some problems but introduces others).

**16. How do microservices enable "Fault Isolation"?**
If one service crashes (e.g., memory leak in Image Service), it does not crash the entire application.

**17. How do microservices support "Technology Diversity"?**
Teams can pick the best language or framework for a specific service without affecting the rest of the system.

### Section 4: Drawbacks & Challenges

**18. What is the primary challenge regarding _transactions_ in microservices?**
Maintaining data consistency across multiple services is difficult because you cannot use traditional ACID transactions.

**19. What is the "Distributed Monolith" trap?**
If you decompose the system incorrectly, you create a system that is tightly coupled but distributed, combining the complexity of microservices with the inflexibility of a monolith.

**20. Why is testing harder in a microservice architecture?**
You have to test interactions between distributed services, which is more complex than testing a single application.

### Section 5: The Pattern Language (Technical Details)

**21. What are the two patterns mentioned for decomposing an application?**
Decompose by Business Capability and Decompose by Subdomain (DDD).

**22. Since 2PC (Two-Phase Commit) is not an option, what pattern is used for data consistency?**
The Saga pattern.

**23. What are two patterns used to solve the problem of "How to perform queries" across multiple databases?**
API Composition and CQRS (Command Query Responsibility Segregation).

**24. What is a "Microservice Chassis"?**
A framework or pattern that handles cross-cutting concerns (like logging and health checks) so developers don't have to implement them for every service.

**25. What are the two main types of communication styles between services?**
Synchronous (e.g., REST, gRPC) and Asynchronous (e.g., Messaging/Events).

**26. What is the purpose of "Service Discovery"?**
To allow a client or service to find the network location (IP address) of a service instance dynamically.

**27. What is the "Circuit Breaker" pattern used for?**
To handle failures in remote service calls (preventing a failure in one service from cascading to others).

**28. What is the solution for monitoring a request that spans multiple services?**
Distributed Tracing.

**29. Because logs are scattered across many servers, what pattern is required for observability?**
Log Aggregation.

**30. According to the "Summary" slide, when should you use Monolithic Architecture vs. Microservices?**
Use Monoliths for small applications; use Microservices for large, complex applications.
