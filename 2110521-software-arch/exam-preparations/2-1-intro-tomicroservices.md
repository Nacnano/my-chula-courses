# Documentation: Introduction to Microservice Architecture

**Original Presentation by:** Wiwat Vatanwood, Duangdao Wichadakul, Nuengwong Tuaycharoen, Pittipol Kantavat  
**Reference Material:** _Microservices Patterns_ by Chris Richardson (Manning, 2019)

---

## 1. Executive Summary

This document explores the transition from traditional **Monolithic Architecture** to **Microservice Architecture**. It defines software architecture, explains why modern development velocity demands a shift in structure, analyzes the "Scale Cube," and details the "Pattern Language" required to successfully implement microservices.

**Key Takeaway:** Microservices are not a "silver bullet" (a magical solution). They are a tool for handling complexity in large systems. While they solve specific problems regarding speed and scalability, they introduce new challenges in distributed system management.

---

## 2. Foundations of Software Architecture

### What is Software Architecture?

Software architecture is the blueprint of a computing system. According to Bass et al., it consists of the **structures** needed to reason about the system. These structures include:

- **Software Elements:** The code, classes, and components.
- **Relations:** How these elements connect and talk to each other.
- **Properties:** The characteristics of both the elements and their relations.

Architecture is multi-dimensional (like a building has structural, electrical, and plumbing views) and is described through multiple "views."

### Why Architecture Matters

The primary goal of architecture is to satisfy **Non-Functional Requirements (NFRs)**, also known as **Quality Attributes** or "-ilities."

While _functional requirements_ define what the app _does_, _non-functional requirements_ define _how well_ it does it. Examples include:

- **Maintainability:** How easy is it to fix bugs?
- **Testability:** How easy is it to verify the code works?
- **Deployability:** How easily can we release changes?
- **Scalability:** Can it handle more users?
- **Reliability:** Does it stay online?

**The Critical Link:** Good architecture improves Maintainability, Testability, and Deployability, which directly increases **Development Velocity** (the speed at which a business can innovate).

---

## 3. Modern Development Context

Businesses today must innovate faster. The goal is to "move fast and _not_ break things."

- **High Performers:** Deploy on-demand (multiple times a day), have a lead time of less than one hour, and have a change failure rate of 0-15%.
- **The Modern Triad:** Successful modern development relies on three pillars:
  1.  **Process:** DevOps and Continuous Delivery (CD).
  2.  **Organization:** Small, autonomous teams.
  3.  **Architecture:** ?? (This is where Microservices fit in).

---

## 4. The Monolithic Architecture

### Definition

A **Monolithic Architecture** structures the application as a **single executable component**. All code (handling requests, business logic, database access) lives in one codebase and is deployed together.

### The Lifecycle of a Monolith

1.  **Small Monoliths (Good):** When an app is new and small, a monolith is great. It is easy to develop, test, and deploy.
2.  **Growth:** Successful apps grow. Teams grow. The codebase expands.
3.  **Monolithic Hell (Bad):** Eventually, the application becomes too large (e.g., the "Pyramid" visual). Agile development becomes impossible.

### Symptoms of "Monolithic Hell"

- **Complexity:** The code is too vast for any single developer to understand.
- **Slow Development:** IDEs involve lag; the application takes forever to start up.
- **Deployment Nightmares:** The path from code commit to production is long and arduous.
- **Scaling Limitations:** You cannot scale specific parts of the app; you must clone the _entire_ huge application, wasting memory and CPU.
- **Technology Lock-in:** You are stuck with the technology stack you started with (e.g., an old version of Java) because rewriting the whole monolith is too expensive.
- **Lack of Reliability:** A bug in one module (e.g., billing) can crash the entire process (taking down the whole website).

---

## 5. The Microservice Architecture

### Definition

Microservice architecture structures an application as a **set of loosely coupled services** organized around **business capabilities**.

- **Loosely Coupled:** Services can be updated independently.
- **Business Capabilities:** Services are defined by what they do for the business (e.g., "Order Service," "Delivery Service," "Billing Service") rather than technical layers.

### The Scale Cube (X, Y, Z Scaling)

To understand microservices, we look at the Scale Cube, which defines three ways to scale an application:

1.  **X-Axis (Horizontal Duplication):**
    - _Method:_ Run multiple copies (clones) of the monolith behind a Load Balancer.
    - _Pros:_ Increases capacity and availability.
    - _Cons:_ Doesn't solve complexity; each clone is still the full giant monolith.
2.  **Z-Axis (Data Partitioning):**
    - _Method:_ Run multiple copies of the code, but route requests based on an attribute (e.g., User ID). Users A-M go to Server 1; Users N-Z go to Server 2.
    - _Pros:_ Handles massive data volumes.
    - _Cons:_ Still doesn't solve codebase complexity.
3.  **Y-Axis (Functional Decomposition):**
    - _Method:_ Split the monolithic application into smaller services based on function. **This is Microservices.**
    - _Pros:_ Solves complexity by breaking the problem down.

### Key Benefits

1.  **Enables Continuous Delivery:** Because services are small, they are easy to test and deploy.
2.  **Maintainability:** Codebases are smaller and easier to understand.
3.  **Independent Scaling:** You can scale just the "Image Processing" service on high-CPU hardware without needing to scale the "User Login" service.
4.  **Fault Isolation:** If the "Recommendation Service" crashes, the rest of the app (like "Checkout") keeps working.
5.  **Technology Evolution:** You can write a new service in a modern language (e.g., Go or Node.js) while keeping older services in Java.

### Drawbacks (The "No Silver Bullet" Rule)

1.  **Distributed Complexity:** You move complexity from the code to the network. Services must communicate over a network, which is unreliable.
2.  **Data Consistency:** Maintaining data integrity across services (each with its own database) is very hard (requires Sagas).
3.  **Operational Overhead:** You need to deploy and monitor dozens or hundreds of services instead of just one.
4.  **Refactoring Difficulty:** Deciding exactly _where_ to cut the monolith is difficult. If done wrong, you create a "Distributed Monolith" (all the pain of microservices with none of the benefits).

---

## 6. The Microservice Pattern Language

To solve the drawbacks mentioned above, architects use a "Pattern Language"—a set of reusable solutions to common problems.

### A. Decomposition Patterns (How to split?)

- **Problem:** How do we break the monolith?
- **Solutions:**
  1.  **Decompose by Business Capability:** Align services with business departments (e.g., Order Management, Inventory).
  2.  **Decompose by Subdomain (DDD):** Use Domain-Driven Design to define boundaries.

### B. Database Patterns (Data Management)

- **Problem:** How to maintain data consistency when services are separate?
- **Context:** In microservices, every service has its **own private database** to ensure loose coupling. One service cannot query another's database directly.
- **Solutions:**
  1.  **Saga:** A sequence of local transactions. Instead of one big lock (ACID), Service A updates data, then triggers an event for Service B to update its data.
  2.  **CQRS (Command Query Responsibility Segregation) / API Composition:** Patterns used to query data that is scattered across multiple services.

### C. Communication Patterns

- **Problem:** How do services talk to each other?
- **Solutions:**
  1.  **Messaging (Async):** Services send events/messages (e.g., RabbitMQ, Kafka). Good for decoupling.
  2.  **Remote Procedure Invocation (Sync):** Direct calls like REST or gRPC.
  3.  **Service Discovery:** How does Service A find the IP address of Service B?
      - _Client-side Discovery_ vs. _Server-side Discovery_.
      - _Service Registry:_ A database of available service locations.

### D. Deployment Patterns

- **Problem:** How do we deploy these efficiently?
- **Solutions:**
  1.  **Single Service per Host:** Dedicated VM or Container (Docker) for each service.
  2.  **Serverless:** (e.g., AWS Lambda) Upload code and let the cloud handle the rest.
  3.  **Microservice Chassis:** A framework that handles cross-cutting concerns (logging, config, metrics) so the developer only focuses on logic.

### E. Observability Patterns

- **Problem:** How do we monitor a system scattered across 50 servers?
- **Solutions:**
  - **Distributed Tracing:** Tracking a single user request as it hops through multiple services.
  - **Log Aggregation:** Centralizing logs from all services into one place.
  - **Health Checks:** Endpoints that tell the system if a service is alive.

---

## 7. Glossary of Technical Terms

- **ACID:** (Atomicity, Consistency, Isolation, Durability) Properties of traditional database transactions ensuring data validity. Microservices often sacrifice strong ACID consistency for scalability.
- **API Gateway:** A server that acts as an entry point for clients (mobile/web), routing requests to the appropriate microservices.
- **Continuous Delivery (CD):** A software engineering approach where teams produce software in short cycles, ensuring that the software can be reliably released at any time.
- **Coupling:** The degree of interdependence between software modules. **Loose coupling** (good) means changing one module doesn't break others. **Tight coupling** (bad) means they are stuck together.
- **DDD (Domain-Driven Design):** A software design approach focusing on modeling software to match complex business domains.
- **DevOps:** A set of practices that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle.
- **Distributed System:** A system whose components are located on different networked computers, which communicate and coordinate their actions by passing messages.
- **Load Balancer:** A device that distributes network traffic across a number of servers to ensure no single server bears too much load.
- **Saga:** A design pattern for managing data consistency across microservices in distributed transaction scenarios. It breaks a transaction into smaller, local transactions.
