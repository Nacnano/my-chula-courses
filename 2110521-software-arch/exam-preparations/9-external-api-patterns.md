# External API Pattern & API Gateway Architecture

## 1. Introduction: The Challenge of Diverse Clients

In a modern microservices architecture, the backend is split into many small services. However, the clients accessing these services (users) are diverse and have different constraints.

### The Four Types of Clients

1.  **Web Applications:** Server-side web apps running within the firewall (LAN). Latency is usually low.
2.  **Browser-based JavaScript Apps:** Single Page Applications (SPAs) running in the user's browser.
3.  **Mobile Applications:** iOS/Android apps running on smartphones.
4.  **Third-party Applications:** External developers integrating with your system.

### The Problem with Direct Access

Allowing these clients to communicate directly with backend microservices causes significant issues:

- **"Chattiness" & Latency:** To build a single screen (e.g., an Order Details page), a mobile client might need to make distinct calls to the _Order Service_, _Kitchen Service_, _Delivery Service_, and _Accounting Service_. On a slow mobile network (high latency), these sequential round-trips result in a slow, poor user experience.
- **Protocol Mismatch:** Backend services often use lightweight, internal protocols like **gRPC** or **AMQP** (messaging). Web and mobile clients typically require **HTTP/REST** or **WebSocket**.
- **Security & Coupling:** Exposing internal microservices directly to the public internet creates security risks. Furthermore, if the backend team splits one service into two, the frontend code breaks.

---

## 2. The Solution: The API Gateway Pattern

The **API Gateway** acts as the single entry point (the "Doorman" or "Front Desk") for all external traffic. It sits between the external clients and the internal microservices.

### Core Responsibilities

The API Gateway encapsulates the internal system architecture and performs three main tasks:

1.  **Request Routing:**
    Similar to a reverse proxy (like NGINX), it looks at the incoming request URL and routes it to the correct specific microservice.
2.  **API Composition (Aggregation):**
    - _The Problem:_ A client needs data from 3 different services.
    - _The Solution:_ The client sends **one** request to the Gateway. The Gateway makes the 3 calls to the internal services (over the fast internal network), combines the results, and returns a **single** response to the client. This solves the "chattiness" issue.
3.  **Protocol Translation:**
    The Gateway accepts external-friendly protocols (e.g., HTTP/REST) and translates them into internal protocols (e.g., gRPC) to talk to backend services.

---

## 3. Pattern Evolution: From OSFA to BFF

### The "One-Size-Fits-All" (OSFA) Approach

Originally, companies used a single, giant API Gateway for all clients.

- **Drawback:** Different clients need different data. Mobile needs less data (to save battery/bandwidth); Web needs more details. A single API trying to satisfy everyone becomes bloated and difficult to maintain.

### The "Backends for Frontends" (BFF) Pattern

This is the modern evolution of the gateway pattern. Instead of one giant gateway, you create a specific API Gateway for each type of client.

- **Mobile API Gateway:** Optimized for small screens and low bandwidth.
- **Web API Gateway:** Optimized for desktop browsers.
- **Public API Gateway:** Strict versioning and security for 3rd party devs.

**Benefits of BFF:**

- **Decoupling:** If the Mobile team needs a change, they don't break the Web team's code.
- **Autonomy:** Client teams can own and deploy their own gateways.

---

## 4. Edge Functions

Edge functions are non-business logic mechanisms that process requests at the "edge" of the system (the boundary between the internet and your network).

**Examples of Edge Functions:**

- **Authentication:** Verifying the user's identity.
- **Authorization:** Verifying permissions.
- **Rate Limiting:** Restricting the number of requests per second (to prevent spam/DDoS).
- **Caching:** Storing responses to reduce backend load.
- **Metrics & Logging:** Tracking usage for billing or debugging.

### Where should Edge Functions live?

1.  **In the Backend Service:** _Not Recommended._ It clutters business logic and is less secure (unauthenticated requests reach deep into the network).
2.  **In a Separate Edge Service:** _Good,_ but adds an extra network "hop" (increasing latency).
3.  **In the API Gateway:** _Best Practice._ It reduces network hops and centralizes security policies.

---

## 5. Design Issues: Performance & Reliability

Since the API Gateway is the entry point for _everything_, it must be highly performant and reliable.

### Performance: Sync vs. Async

- **Synchronous (Thread-per-request):**
  - _How it works:_ Each incoming request is assigned a dedicated thread.
  - _Pros:_ Easy to program.
  - _Cons:_ Threads are "heavyweight" (consume memory). If threads run out, the server blocks. Not ideal for high-load gateways.
- **Asynchronous (Reactive/Non-blocking):**
  - _How it works:_ Uses a single event loop and callbacks.
  - _Pros:_ Extremely scalable. Can handle thousands of connections with few threads.
  - _Cons:_ "Callback Hell"—code is harder to read and debug.
  - _Solution:_ Use **Reactive Programming** abstractions (e.g., Java `CompletableFutures`, `RxJava`, `Project Reactor`) to write async code that looks cleaner and allows concurrent execution of backend calls.

### Reliability: The Circuit Breaker Pattern

If a backend service fails, the API Gateway must not hang (waiting forever). It should fail gracefully.

**Circuit Breaker States:**

1.  **Closed (Normal):** Requests flow through to the backend service.
2.  **Open (Failed):** The backend has failed too many times. The gateway immediately returns an error or a default value without trying to call the backend. This prevents cascading failures.
3.  **Half-Open (Testing):** After a timeout, the gateway lets one request through to see if the backend is fixed. If successful, it switches back to "Closed."

---

## 6. Implementation Options

### Option A: Off-the-Shelf Products

Using ready-made SaaS or software.

- **AWS API Gateway:** Fully managed, handles scaling. _Limit:_ Good for simple routing, but hard to implement complex "API Composition" logic.
- **Kong / Traefik:** Powerful, based on NGINX or Go. Great for routing and edge functions.

### Option B: Custom Development (Frameworks)

Building your own gateway (usually a web app) to allow full control over logic and composition.

- **Netflix Zuul:** One of the original Java gateways. (Mostly synchronous/blocking in early versions).
- **Spring Cloud Gateway:** The modern standard for Java/Spring. Built on **Spring 5**, **Spring Boot 2**, and **Project Reactor**. It handles non-blocking (reactive) requests effectively.
- **GraphQL:** An alternative approach where the client defines the data structure they want.
  - _How it works:_ A "Schema" defines all available data. "Resolvers" fetch data from different microservices.
  - _Benefit:_ Eliminates over-fetching and under-fetching of data.

---

## 7. Glossary of Key Terms

| Term                           | Definition                                                                                                                                                     |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Gateway**                | A server that acts as an entry point into a system, responsible for request routing, composition, and protocol translation.                                    |
| **BFF (Backend for Frontend)** | An architecture pattern where a separate API Gateway is created for each specific client type (e.g., one for iOS, one for Web).                                |
| **Microservices**              | An architectural style where an application is structured as a collection of loosely coupled services.                                                         |
| **Monolith**                   | A traditional architecture where all components of an application are bundled into a single unit.                                                              |
| **Latency**                    | The delay before a transfer of data begins following an instruction. (Mobile networks often have high latency).                                                |
| **Protocol Translation**       | Converting one communication protocol (e.g., HTTP/REST) to another (e.g., gRPC) transparently.                                                                 |
| **API Composition**            | The process of bundling multiple backend requests into a single client request to improve efficiency.                                                          |
| **Edge Functions**             | Cross-cutting concerns like Auth, logging, and rate-limiting applied at the boundary of the system.                                                            |
| **Reactive Programming**       | A programming paradigm oriented around data flows and the propagation of change, essential for non-blocking I/O.                                               |
| **Circuit Breaker**            | A design pattern used to detect failures and encapsulate the logic of preventing a failure from constantly recurring (e.g., stopping calls to a dead service). |
| **Synchronous I/O**            | Blocking operations where the execution waits for the task to finish (e.g., waiting for a database reply).                                                     |
| **Asynchronous I/O**           | Non-blocking operations where the system can do other work while waiting for a task to finish.                                                                 |
| **GraphQL**                    | A query language for APIs that gives clients the power to ask for exactly what they need and nothing more.                                                     |
