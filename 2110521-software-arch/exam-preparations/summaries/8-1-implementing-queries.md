# Documentation: Implementing Queries in Microservice Architecture

## 1. Introduction & The Core Challenge

**Context:** In a monolithic application, all data usually resides in a single, large relational database. Querying complex data is straightforward because you can use SQL `JOIN`s to combine data from multiple tables.

**The Microservice Problem:**
In a microservice architecture, the "Database per Service" pattern is standard. This means:

- Each service has its own private database.
- Services cannot access another service's database directly.
- **The Challenge:** How do you retrieve data that spans multiple services (e.g., an "Order" that needs data from "Customer," "Restaurant," and "Delivery" services)?

There are two primary patterns to solve this:

1.  **API Composition Pattern** (Simpler, prefer this when possible).
2.  **CQRS (Command Query Responsibility Segregation) Pattern** (More complex, used for high-performance/complex queries).

---

## 2. Solution 1: The API Composition Pattern

This is the most straightforward approach and should be your first choice unless technical requirements force you to use CQRS.

### How It Works

The pattern involves two main participants:

1.  **API Composer:** The component that initiates the query.
2.  **Provider Services:** The microservices that own the actual pieces of data.

**The Process:**

1.  The **Composer** receives a query request (e.g., `findOrder()`).
2.  The Composer breaks this down and calls multiple **Provider Services** (e.g., calls _Order Service_, _Kitchen Service_, _Delivery Service_).
3.  The Composer waits for responses, combines (aggregates) the results in memory.
4.  The Composer returns the combined result to the client.

### Design Decisions: Where to put the Composer?

You can implement the API Composer in three places:

1.  **In the Client (e.g., Web App):** The frontend makes multiple calls to different services and stitches the data together.
    - _Drawback:_ Not practical for mobile devices or outside networks due to network latency/slowness.
2.  **In the API Gateway:** The gateway acts as the entry point and handles the aggregation.
    - _Benefit:_ efficient for external clients (mobile/web).
3.  **As a Standalone Service:** A dedicated backend service just for aggregating this specific data.
    - _Benefit:_ Good for complex logic used internally by multiple other services.

### Performance & Optimization

To make API Composition efficient:

- **Parallel Execution:** Never call services sequentially (one after another) if they don't depend on each other. Call them all at the same time (in parallel).
- **Reactive Programming:** Use models like RxJava or CompletableFutures. This avoids blocking threads while waiting for responses, which is crucial for scalability.

### Drawbacks

- **High Overhead:** Requires significant computing and network resources.
- **Reduced Availability:** If one provider service goes down, the entire query usually fails. The more services involved, the higher the risk of failure.
- **No Transactional Consistency:** It is difficult to ensure data is perfectly consistent across all services at the exact moment of the query.
- **Inefficient Joins:** It is very bad at "In-memory joins" for large datasets (e.g., "Find all customers who ordered Pizza"). The composer would have to fetch _all_ orders and _all_ customers and match them in RAM, which is too slow.

---

## 3. Solution 2: The CQRS Pattern

**CQRS** stands for **Command Query Responsibility Segregation**. This pattern is used when API Composition is too inefficient or cannot perform the required complex filtering/sorting.

### Why use CQRS? (Motivations)

API Composition fails when:

1.  **Complex Sorting/Filtering:** You need to sort data by a field owned by a service that doesn't hold the main ID (e.g., "Show orders sorted by the Chef's name"—but the Order Service doesn't know Chef names).
2.  **Large Datasets:** Merging thousands of records in memory is slow.
3.  **Separation of Concerns:** The team managing the "Order" database might not want to maintain complex indexes for geospatial queries (e.g., "Find available restaurants near me").

### How It Works

CQRS splits the application into two distinct sides:

1.  **Command Side (Write):** Handles creating, updating, and deleting data. It uses a database optimized for transactional integrity.
2.  **Query Side (Read):** Handles viewing data. It uses a separate database (a **View Database**) optimized specifically for the queries required.

**The Data Flow:**

1.  User performs an action (Command).
2.  Command Service updates its DB and publishes an **Event** (e.g., `OrderCreated`).
3.  The Query Service **subscribes** to this event.
4.  The Query Service updates its own **View Database** to reflect the change.
5.  When a User searches (Query), data is fetched instantly from the View Database.

### Benefits

- **Efficient Queries:** You can design the View Database schema specifically for the query (e.g., pre-joined tables).
- **Diverse Technologies:** You can use different databases for different needs (e.g., SQL for finance, ElasticSearch for text search, Neo4j for fraud detection graphs).
- **Event Sourcing Compatible:** It works naturally with systems that store state as a sequence of events.

### Drawbacks

- **Complexity:** Requires managing separate databases and synchronization logic.
- **Replication Lag (Eventual Consistency):** There is a delay between the Command Side publishing an event and the Query Side updating the View.
  - _The Problem:_ A user might update their profile, refresh the page, and still see old data because the View hasn't updated yet.
  - _Solution:_ The client can use version tokens to poll the View until it catches up, or optimistically update the UI before the server confirms.

---

## 4. Designing CQRS Views (Technical Implementation)

Implementing the Query side requires careful architecture.

### Anatomy of a View Module

A CQRS View module generally consists of three sub-modules:

1.  **Event Handlers:** Listen for events from the message queue (e.g., Kafka/RabbitMQ).
2.  **Data Access Object (DAO):** The logic that actually writes to the View Database.
3.  **Query API:** The REST/gRPC endpoint that clients call to get data.

### Selecting a View Datastore

You are not limited to SQL. Choose the database based on the query type:

- **JSON/Document Lookup:** Use MongoDB or DynamoDB.
- **Text Search:** Use ElasticSearch (great for keywords).
- **Graph/Relationships:** Use Neo4j (great for social networks or fraud detection).
- **Standard Reporting:** Use standard RDBMS (SQL).

### Handling Concurrency & Idempotency

Since events happen asynchronously, you must handle specific data integrity issues:

- **Idempotency (Duplicate Events):** Message queues sometimes deliver the same message twice. The View updater must check if an Event ID has already been processed. If yes, discard it to prevent corrupt data.
- **Concurrent Updates:** If multiple events arrive for the same record simultaneously, the DAO must use locking or optimistic concurrency control to ensure one update doesn't accidentally overwrite a newer one.

---

## 5. Glossary of Technical Terms

- **Microservice Architecture:** A design approach where an application is built as a collection of small, independent services, each running its own process and communicating with lightweight mechanisms (usually HTTP APIs).
- **Monolithic Architecture:** A traditional model where the entire application functions as a single unit with a shared database.
- **API Gateway:** A server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.
- **Aggregation:** The process of gathering data from multiple sources and combining it into a single result.
- **In-Memory Join:** A programming technique where datasets are fetched into the application's RAM (Random Access Memory) and matched/combined there, rather than using the database engine to join them. This is generally slower for large data.
- **Reactive Programming:** A programming paradigm oriented around data flows and the propagation of change. It allows code to be non-blocking (it doesn't freeze while waiting for a database), making it highly efficient for orchestrating multiple service calls.
- **Eventual Consistency:** A consistency model used in distributed computing to achieve high availability. It guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. (i.e., the data _will_ be correct, but there might be a slight delay).
- **Idempotent:** A property of operations whereby the operation can be applied multiple times without changing the result beyond the initial application. (e.g., Setting `x = 5` is idempotent; `x = x + 1` is not).
- **Event Sourcing:** A pattern where the state of the application is determined by a sequence of events (like a ledger) rather than just the current state.
- **Geospatial Query:** A query that searches for data based on location coordinates (e.g., "within 5km of this point").

---

## 6. Summary Recommendation

| Feature                | API Composition Pattern                      | CQRS Pattern                                                       |
| :--------------------- | :------------------------------------------- | :----------------------------------------------------------------- |
| **Complexity**         | Low                                          | High                                                               |
| **Speed to Implement** | Fast                                         | Slow                                                               |
| **Data Consistency**   | Immediate (mostly)                           | Eventual (lag exists)                                              |
| **Infrastructure**     | Minimal additional infrastructure            | Requires separate DBs & Message Brokers                            |
| **Best Used For**      | Simple lookups, small datasets, prototyping. | Complex queries, heavy filtering, high-scale searching, reporting. |

**Rule of Thumb:** Start with **API Composition**. If you hit performance bottlenecks or complex filtering requirements that in-memory aggregation cannot handle, then refactor that specific part of the system to use **CQRS**.
