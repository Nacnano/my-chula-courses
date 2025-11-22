### Part 1: Core Concepts & The "Why"

1.  **Question:** What is the primary network performance issue that mobile clients face when communicating directly with microservices?
    **Answer:** High network latency (resulting in slow round-trip times).

2.  **Question:** What is the term used to describe a client that needs to make multiple requests to different services to render a single screen?
    **Answer:** "Chatty" client (or Chattiness).

3.  **Question:** Besides latency, name one other major drawback of allowing clients to access microservices directly.
    **Answer:** Protocol mismatch (e.g., Web supports HTTP but backend uses gRPC) OR Security/Encapsulation issues (exposing internal architecture).

4.  **Question:** In the context of the External API Pattern, what is "Protocol Translation"?
    **Answer:** Converting external-friendly protocols (like HTTP/REST) into internal protocols (like gRPC or AMQP) within the Gateway.

5.  **Question:** What is the main security risk of implementing authentication logic inside every individual backend microservice?
    **Answer:** Unauthenticated requests travel deep into the internal network before being stopped; it is less secure than stopping them at the edge.

### Part 2: The API Gateway Pattern

6.  **Question:** What are the three main functional responsibilities of an API Gateway?
    **Answer:** Request Routing, API Composition, and Protocol Translation.

7.  **Question:** Which responsibility of the API Gateway functions similarly to a "Reverse Proxy" (like NGINX)?
    **Answer:** Request Routing.

8.  **Question:** What is "API Composition"?
    **Answer:** The process of aggregating data from multiple backend services into a single response for the client.

9.  **Question:** Why is API Composition preferred over client-side composition for mobile devices?
    **Answer:** It reduces the number of network round-trips over the slow mobile network (shifting the traffic to the fast internal network).

10. **Question:** If an API Gateway invokes three backend services **sequentially**, how is the total response time calculated?
    **Answer:** The sum of the response times of all three services.

11. **Question:** To optimize performance during API Composition, how should the Gateway invoke independent backend services?
    **Answer:** Concurrently (in parallel).

### Part 3: Backend for Frontends (BFF)

12. **Question:** What is the "One-Size-Fits-All" (OSFA) API approach, and why is it often problematic?
    **Answer:** A single API Gateway for all clients; it becomes bloated and hard to maintain because different clients (Web vs. Mobile) have different data requirements.

13. **Question:** What is the core definition of the "Backend for Frontends" (BFF) pattern?
    **Answer:** Defining a separate, dedicated API Gateway for each specific client type (e.g., one for Mobile, one for Web).

14. **Question:** According to the Netflix model shown in the slides, who should own and maintain the API Gateway code for a specific client?
    **Answer:** The client team (e.g., the Mobile team owns the Mobile Gateway).

15. **Question:** What is the primary organizational benefit of the BFF pattern?
    **Answer:** It increases autonomy and decouples teams (the mobile team can change their API without waiting for the backend or web teams).

### Part 4: Edge Functions & Design

16. **Question:** What are "Edge Functions"?
    **Answer:** Non-business logic request processing mechanisms implemented at the application boundary (e.g., Auth, Rate Limiting, Caching).

17. **Question:** Why is placing Edge Functions in a separate "Edge Service" (upstream from the Gateway) considered a drawback?
    **Answer:** It introduces an extra network hop, which increases latency.

18. **Question:** Where is the ideal place to implement Edge Functions to balance security and latency?
    **Answer:** Inside the API Gateway itself.

19. **Question:** What is "Rate Limiting"?
    **Answer:** Restricting the number of requests a client can make per second.

### Part 5: Performance & Reactive Programming

20. **Question:** In a traditional **Synchronous** I/O model, what is the limiting resource that prevents high scalability?
    **Answer:** Threads (OS threads are heavyweight and consume memory).

21. **Question:** What programming model is recommended to solve the "Thread-per-request" bottleneck in API Gateways?
    **Answer:** Asynchronous / Non-blocking I/O (or Reactive Programming).

22. **Question:** What is the "Callback Hell" problem in asynchronous programming?
    **Answer:** Complex, nested code structures that are difficult to read and debug when using standard callbacks.

23. **Question:** What modern Java abstraction (used in Spring 5/Project Reactor) helps write clean asynchronous code?
    **Answer:** `Mono` or `Flux` (Reactive abstractions / Declarative style).

### Part 6: Reliability (Circuit Breaker)

24. **Question:** What is the purpose of the **Circuit Breaker** pattern in an API Gateway?
    **Answer:** To prevent cascading failures and handle failed requests gracefully without hanging the system.

25. **Question:** In the Circuit Breaker pattern, which state indicates that the backend service is healthy and requests are flowing normally?
    **Answer:** Closed State.

26. **Question:** In the Circuit Breaker pattern, which state immediately returns an error without calling the backend service?
    **Answer:** Open State.

27. **Question:** What does the "Half-Open" state in a Circuit Breaker allow the system to do?
    **Answer:** It allows a limited number of requests through to test if the failing service has recovered.

### Part 7: Implementation Technologies

28. **Question:** What is a major limitation of using **AWS API Gateway** (SaaS) compared to developing a custom gateway?
    **Answer:** It does not support API Composition (it mostly just does routing).

29. **Question:** **Spring Cloud Gateway** is built on top of which underlying framework to achieve non-blocking performance?
    **Answer:** Project Reactor (or Spring WebFlux).

30. **Question:** In a **GraphQL** architecture, what is the specific function called that fetches the data for a specific field in the schema?
    **Answer:** A Resolver.
