# Event Sourcing: A Comprehensive Guide

## 1. Introduction

**Event Sourcing** is a data architecture pattern that fundamentally changes how data is stored. Instead of saving only the _current_ state of an object (e.g., "The order status is 'Paid'"), Event Sourcing saves **every change** that has ever happened to that object as a series of immutable events. By replaying these events, you can reconstruct the full history and current state of the system at any point in time.

---

## 2. The Problem with Traditional Data Storage (CRUD)

To understand Event Sourcing, we must first look at the traditional method: **CRUD** (Create, Read, Update, Delete).

- **How CRUD works:** When a user updates their information (e.g., changing their address), the database takes the new address and **overwrites** the old one.
- **The Issue:** Once the overwrite happens, the history is lost. You cannot answer questions like: _“What was the address yesterday?”_ or _“Why did the address change?”_
- **The Event Sourcing Solution:** Instead of overwriting, we record a new event called `UserAddressChanged` containing the old and new values. We now have a permanent record of the change, the time it happened, and potentially the reason why.

---

## 3. Core Concepts and Terminology

### A. Events

An event represents a fact that took place in the past. In an online ordering system, typical events might include:

- `OrderCreated`: A user starts a new order.
- `ItemAdded`: A product is placed in the cart.
- `ItemRemoved`: A product is taken out.
- `OrderCheckedOut`: Payment is finalized.

### B. Aggregates

An **Aggregate** is the main object or entity you are tracking. It acts as a boundary for data consistency.

- _Example:_ An **Order** or a **User Account**.

### C. Streams

Each Aggregate has its own list of events, referred to as a **Stream**.

- _Example:_ The "Order Aggregate" has a stream consisting of [`OrderCreated`, `ItemAdded`, `ItemRemoved`, `OrderCheckedOut`].

### D. Projections (Read Models)

Raw events (like a list of "Add" and "Remove" actions) are difficult for humans or applications to query efficiently. A **Projection** processes these events to create an easy-to-read view of the current state.

- _Example:_ Instead of calculating the total items every time you look at a cart, a Projection creates a database table showing: `OrderID: 1001 | Customer: Alice | TotalItems: 3`.

### E. Snapshots (Performance Optimization)

Replaying thousands of events to calculate the current state of an object can be slow.

- **How it works:** The system periodically saves the full state of an aggregate (a **Snapshot**) to a file or database.
- **Benefit:** When loading an object, the system loads the last Snapshot and only replays the few events that happened _after_ that snapshot was taken, drastically improving speed.

---

## 4. Advanced Architecture: CQRS

Event Sourcing is frequently paired with **CQRS** (**C**ommand **Q**uery **R**esponsibility **S**egregation). This pattern separates the code that changes data from the code that reads data.

1.  **Write Side (Command):** Handles logic that changes data. It saves the events (e.g., `ItemAdded`) to the Event Store.
2.  **Read Side (Query):** Handles data retrieval. It reads from the Projections (simple views) to show data to the user quickly.

**The Flow:**

1. User adds an item $\rightarrow$ `ItemAdded` event is saved (Write Side).
2. The event is processed $\rightarrow$ The Order Summary table is updated (Read Side).
3. User views the cart $\rightarrow$ System reads from the Order Summary table.

---

## 5. Data Consistency: 2PC vs. Event Atomicity

### The Problem: Two Phase Commit (2PC)

In distributed systems, ensuring two different databases (e.g., Payment and Inventory) agree on a transaction is difficult. Historically, **2PC** was used:

1.  **Phase 1 (Prepare):** All systems promise they are ready to commit.
2.  **Phase 2 (Commit):** A coordinator tells everyone to save the data.

**Disadvantages of 2PC:**

- **Slow:** The system must wait for _every_ participant to confirm.
- **Fragile:** If one system fails or delays, the whole transaction locks up or fails.

### The Solution: Atomicity in Event Sourcing

Event Sourcing removes the need for 2PC.

- **Atomic Action:** Saving a single event (e.g., `PaymentCompleted`) to the Event Store is a single, complete action. It cannot partially fail.
- **Eventual Consistency:** Once that event is saved, other services (like Inventory) listen for it and update their own data independently. This keeps the system fast and decoupled.

---

## 6. Critical Consideration: Ordering

**Ordering Guarantees** are vital in Event Sourcing. Events must be processed in the exact order they were created.

- _Risk:_ If an `OrderCheckedOut` event is processed before the `ItemAdded` event, the calculation will be wrong (e.g., charging the user \$0 instead of \$100).
- _Requirement:_ The underlying infrastructure (Event Bus/Store) must guarantee sequence.

---

## 7. Summary of Benefits & Challenges

### Benefits

1.  **Zero Data Loss:** Every change is stored; nothing is ever overwritten.
2.  **Time Travel:** You can rebuild the system state as it looked at any specific point in the past.
3.  **Audit & Insight:** Historical events allow you to analyze user behavior patterns over time.
4.  **Microservices:** Events act as a communication method, making it easy to share data between services.
5.  **Scalability:** With CQRS, you can scale the "Read" servers independently from the "Write" servers.

### Disadvantages

1.  **Learning Curve:** It is harder to learn and implement than standard CRUD.
2.  **Complexity:** Querying the "current state" is more complex (requires Projections).
3.  **Eventual Consistency:** The "Read" side might lag slightly behind the "Write" side (milliseconds to seconds), meaning a user might not see their update _instantly_.
4.  **Tooling:** Requires specific patterns (like CQRS) to work effectively.

---

## 8. Implementation Reference

The presentation includes a hands-on implementation guide using the **Golang** programming language.

- **Repository:** `https://github.com/peyrone/go-event-sourcing`
