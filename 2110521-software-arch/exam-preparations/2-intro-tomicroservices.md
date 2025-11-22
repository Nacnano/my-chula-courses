# Introduction to Microservice Architecture: Course Documentation

## Executive Summary

Software architecture is not just about code structure; it is about meeting business goals through **Non-Functional Requirements (NFRs)** like maintainability, scalability, and deployability. While traditional **Monolithic** architectures work well for small applications, they become unmanageable as systems grow ("Monolithic Hell"). **Microservices** offer a solution by splitting applications into small, autonomous services, enabling organizations to innovate faster and adopt **DevOps** practices. However, Microservices are not a "silver bullet" and introduce their own complexity regarding distributed data, communication, and testing.

---

## 1. Fundamentals of Software Architecture

### What is Software Architecture?

Software architecture is the high-level structure of a computing system. It is multi-dimensional, similar to how a building has structural, electrical, and plumbing views.

- **Definition:** It comprises **software elements**, the **relations** among them, and the **properties** of both.
- **Core Components:** Elements (code/modules), Relations (dependencies/communication), and Properties (behavior).

### Why Does Architecture Matter?

The primary goal of architecture is to satisfy **Non-Functional Requirements (NFRs)**, also known as **Quality Attributes** or **"-ilities"**.

- **Functional Requirements:** What the software _does_ (features).
- **Non-Functional Requirements:** How the software _behaves_ (quality).

**Key Quality Attributes for Modern Development:**

1.  **Maintainability:** How easy is it to fix bugs or update code?
2.  **Testability:** How easily can we verify the software works?
3.  **Deployability:** How quickly and safely can we push code to production?
4.  **Scalability:** Can the system handle increased load?
5.  **Evolvability:** Can the technology stack change over time?

**The Business Goal:**
Businesses must innovate faster. Therefore, IT must **reduce lead time** (time from idea to live feature) and **increase deployment frequency** without breaking things.

---

## 2. The Monolithic Architecture

### Definition

A Monolithic architecture structures the application as a **single executable component**.

- **Implementation View:** All code (Order Management, Billing, User UI) is packaged into one file (e.g., a single `.war` or `.jar` file).
- **Logical View:** Although the code might be organized into classes and packages internally, it is deployed as one unit.

### The Lifecycle of a Monolith

1.  **The Beginning (Small Monolith):**
    - **Pros:** Simple to develop, easy to test, easy to deploy.
    - **Result:** High development velocity.
2.  **The Growth:** Successful apps grow. More developers are added, and the code base expands.
3.  **The End State (Monolithic Hell):**
    - **Complexity:** The code becomes too complex for any single developer to understand.
    - **Slow Development:** IDEs become slow; application startup takes a long time.
    - **Deployment Pain:** Merging code is arduous; builds take forever; "deploying" is a high-risk event.
    - **Scaling Issues:** You cannot scale specific parts (e.g., only the image processing module); you must clone the _entire_ massive application, wasting memory and CPU.
    - **Tech Stack Lock-in:** You are stuck with the framework you chose at the start (e.g., an old version of Java) because rewriting the whole monolith is too risky.

---

## 3. The Microservice Architecture

### Definition

The Microservice architecture structures an application as a set of **loosely coupled services** organized around **business capabilities**.

### The Scale Cube (Strategies for Scaling)

To understand Microservices, we look at the "Scale Cube," which defines three ways to scale an application:

1.  **X-Axis (Horizontal Duplication):**
    - _Method:_ Running multiple identical copies (clones) of the monolith behind a Load Balancer.
    - _Pros:_ Improves capacity and availability.
    - _Cons:_ Doesn't solve development complexity or memory inefficiency.
2.  **Z-Axis (Data Partitioning):**
    - _Method:_ Running multiple identical code instances, but routing traffic based on data attributes (e.g., Users A-M go to Server 1, N-Z go to Server 2).
    - _Pros:_ Handles massive data volumes.
    - _Cons:_ Code is still monolithic and complex.
3.  **Y-Axis (Functional Decomposition):**
    - **This is Microservices.**
    - _Method:_ Splitting the application into different services based on function (e.g., Order Service, Customer Service).

### Characteristics of a Microservice

- **Independently Deployable:** One team can deploy the "Billing Service" without waiting for the "User Service" team.
- **Database per Service:** Each service owns its own data. Other services cannot access that database directly; they must use an API.
- **Defined Interfaces:** Services communicate via APIs (REST, gRPC) or Messaging (Events).

---

## 4. Benefits of Microservices

1.  **Enables Continuous Delivery (CD) & DevOps:** Because services are small, they are easier to test and deploy automatically. This allows frequent releases.
2.  **Team Autonomy:** Small teams can own a service end-to-end. They don't need to coordinate every change with the whole company.
3.  **Fault Isolation:** If the "Recommendation Service" crashes due to a memory leak, the "Order Service" keeps working. In a monolith, one memory leak crashes the whole system.
4.  **Technology Freedom:** Teams can pick the right tool for the job. One service can be written in Java, another in Node.js, and another in Go. You can experiment safely.

---

## 5. Drawbacks & Challenges (No Silver Bullet)

As Fred Brooks said, "There is no silver bullet." Microservices solve complexity in _code_, but they add complexity in _infrastructure and communication_.

1.  **Distributed System Complexity:**
    - Developers must deal with network latency, partial failures, and remote communication.
2.  **Data Consistency is Hard:**
    - Because databases are separated, you cannot use ACID transactions (joins/commits) across services.
    - **Solution:** You must use **Sagas** (sequences of local transactions) to maintain consistency.
3.  **Querying is Difficult:**
    - You cannot perform a SQL `JOIN` across two different services.
    - **Solution:** You must use **API Composition** (calling multiple services and combining results in code) or **CQRS** (Command Query Responsibility Segregation).
4.  **Dependency Management:** Deploying features that span multiple services requires careful coordination.

---

## 6. The Microservice Pattern Language

When building Microservices, you face specific architectural decisions. The "Pattern Language" guides these decisions.

### A. Decomposition Patterns (How to split the monolith?)

- **Decompose by Business Capability:** Group services by what the business does (e.g., Inventory, Sales).
- **Decompose by Subdomain (DDD):** Use Domain-Driven Design to identify sub-domains.

### B. Communication Patterns (How do they talk?)

- **Style:** Messaging (Async) vs. Remote Procedure Invocation (Sync/REST).
- **Discovery:**
  - _Server-side Discovery:_ A router handles finding the service IP.
  - _Client-side Discovery:_ The client asks a "Service Registry" where the service is.

### C. Data Management Patterns

- **Database per Service:** Essential for loose coupling.
- **Saga:** For multi-step transactions across services.
- **CQRS:** Separating the logic for reading data (Queries) from writing data (Commands) to handle complex views.

### D. Deployment Patterns

- **Multiple Services per Host:** Traditional, efficient but less isolation.
- **Service per Host:** VM, Container (Docker), or Serverless (Lambda). Better isolation.

### E. Cross-Cutting Concerns

- **Microservice Chassis:** A framework that handles logging, metrics, and health checks so developers don't have to rewrite setup code for every service.
- **Observability:**
  - _Distributed Tracing:_ Tracking a request as it jumps between services.
  - _Log Aggregation:_ Centralizing logs from all services.
  - _Health Check API:_ Services report their status to the system.

---

## 7. Glossary of Technical Terms

- **Monolith:** An architecture where all logical modules are packaged into a single deployable unit.
- **Coupling:** The degree of interdependence between software modules. Microservices aim for _Loose Coupling_ (changing one service doesn't break others).
- **DevOps:** A set of practices combining software development (Dev) and IT operations (Ops) to shorten the systems development life cycle.
- **Load Balancer:** A device that acts as a reverse proxy and distributes network or application traffic across a number of servers (used in X-Axis scaling).
- **ACID Transactions:** (Atomicity, Consistency, Isolation, Durability). The standard properties of database transactions that guarantee data validity. Microservices struggle with this across boundaries.
- **Saga:** A design pattern for managing data consistency across microservices in distributed transaction scenarios. A Saga is a sequence of local transactions, where each updates data and publishes an event to trigger the next step.
- **CQRS (Command Query Responsibility Segregation):** A pattern that separates read and update operations for a data store, useful in microservices to handle complex queries that require data from multiple services.
- **API Gateway:** A server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.
- **Circuit Breaker:** A pattern used to detect failures and encapsulate the logic of preventing a failure from constantly recurring (e.g., if a service is down, stop calling it immediately to prevent system overload).
