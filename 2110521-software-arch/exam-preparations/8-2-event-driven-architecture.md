# Documentation: Introduction to Event-Driven Architecture

## 1. The Problem with Traditional Architectures

Modern software is often built using **Service-Based Architectures** (like Microservices). Traditionally, these services communicate using **Synchronous** protocols (Request-Response).

### The "Synchronous" Trap

- **How it works:** Service A asks Service B for data and waits (blocks) until Service B responds.
- **The Issue:** As the number of services grows, the web of interactions becomes complex.
- **The Risk:** If one service fails, the failure cascades. A minor issue in one service can trigger widespread outages across the entire system because everyone is waiting on everyone else.

## 2. The Solution: Asynchronous Event-Driven Architecture

To solve the availability and coupling issues, software can be split into **Asynchronous Flows**.

### Synchronous vs. Asynchronous Communication

| Feature          | Synchronous (e.g., REST)                                                     | Asynchronous (Event-Driven)                                           |
| :--------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **Behavior**     | The client sends a request and stops working (blocks) until a reply arrives. | The client sends a message and immediately moves on to the next task. |
| **Expectation**  | Expects a timely answer.                                                     | Assumes the reply won't be immediate (Fire-and-forget).               |
| **Architecture** | Tightly coupled.                                                             | Loosely coupled.                                                      |

### Brokerless vs. Broker-Based

- **Brokerless:** Services connect directly to one another. This is simpler but requires services to know about each other's locations.
- **Broker-Based (Recommended for EDA):** A **Message Broker** (like Apache Kafka) sits in the middle. Services send messages to the Broker, and the Broker distributes them. The sender does not need to know who the receiver is.

## 3. The Three Modes of Interaction

Programs interact over a network in three distinct ways. Understanding the difference is crucial for EDA.

1.  **Commands (The "Request"):**

    - **Definition:** A request for an action to be performed or a state change to occur.
    - **Tense:** Future/Imperative ("CreateOrder").
    - **Response:** Maybe (often expects a confirmation).
    - **Coupling:** High. The sender tells a specific service what to do.

2.  **Events (The "Fact"):**

    - **Definition:** A notification that something _has already happened_ in the real world.
    - **Tense:** Past ("OrderCreated").
    - **Response:** Never. You cannot change the past.
    - **Coupling:** Low. The sender broadcasts a fact and doesn't care who listens.

3.  **Queries (The "Question"):**
    - **Definition:** A request to look up data.
    - **Side Effects:** None. It leaves the system state unchanged.
    - **Response:** Always.

### The "Two Hats" of Events

Events are powerful because they serve two distinct purposes simultaneously:

1.  **Notification:** "Hey, something happened!" (Triggers other services to wake up and act).
2.  **Replication:** "Here is the data associated with what happened." (Allows other services to copy that data to their own local storage).

## 4. Request-Driven vs. Event-Driven: A Practical Example

To illustrate the difference, consider an **Order Management System**.

### Scenario A: The Request-Driven Way (Old Way)

1.  User clicks "Buy".
2.  Webserver calls **Order Service**.
3.  Order Service **calls** Shipping Service (waiting for response).
4.  Shipping Service **calls** Customer Service to get the address (waiting for response).
5.  **Result:** Highly coupled. If Customer Service is down, Shipping fails, and Orders fails.

### Scenario B: The Event-Driven Way (New Way)

1.  **Notification:**

    - User clicks "Buy".
    - Order Service publishes an event: `OrderCreated` to the Broker (Kafka).
    - Order Service finishes immediately.
    - Shipping Service "listens" for `OrderCreated` and starts its process independently.
    - _Benefit:_ Order Service doesn't even know Shipping Service exists.

2.  **State Transfer (Data Replication):**
    - How does Shipping get the address without calling Customer Service?
    - Previously, Customer Service published `CustomerUpdated` events containing address data.
    - Shipping Service listened to those events and built its own local copy of customer addresses.
    - _Benefit:_ Shipping can query the address locally. Even if Customer Service is offline, Shipping can still ship the package.

## 5. Key Patterns in EDA

### Event Collaboration

Instead of one "God Service" controlling everything, services work together like a relay race.

- **How it works:** Service A does a job and emits an event. Service B hears it, does its job, and emits a new event. Service C hears that, and so on.
- **Ownership:** No single service owns the whole workflow. Each owns a small state transition.

### Choreography vs. Orchestration

These are two ways to manage business workflows.

- **Choreography (The Dancers):**

  - Based on **Event Collaboration**.
  - Decentralized.
  - **Pros:** Highly pluggable. You can add a new service that listens to events without changing the existing services.
  - **Cons:** Harder to visualize the entire flow just by looking at the code.

- **Orchestration (The Conductor):**
  - A central "Controller" service commands others to do work.
  - **Pros:** Easy to understand the logic because it is written in one place.
  - **Cons:** Tightly coupled. If the workflow changes, you must modify the Controller.

### Stateful vs. Stateless Stream Processing

- **Stateful:** The service remembers data from previous events (using tools like **KTable**). It uses events for both notification _and_ data replication. This reduces dependencies on external APIs.
- **Stateless:** The service processes each event in isolation (using **KStreams**). If it needs extra data, it might have to make a synchronous REST call (which introduces coupling again).

## 6. Mixing Protocols (The "Hybrid" Approach)

Real-world systems rarely use only one method. A common modern architecture looks like this:

1.  **Legacy Systems:** Use connectors to pump old data into Kafka.
2.  **User Interface (UI):** Users interact via synchronous **REST** APIs (because users need immediate feedback).
3.  **The Core:** The REST API converts the user request into an **Event** and sends it to the Broker.
4.  **Backend Logic:** Services process business logic asynchronously via **Event Collaboration**.

---

# Glossary of Technical Terms

- **Apache Kafka:** A popular distributed event streaming platform used as a "Message Broker." It stores and routes events between services.
- **Coupling:** The degree of dependency between two services.
  - _Tight Coupling:_ If A changes/fails, B breaks (Bad).
  - _Loose Coupling:_ A and B can operate independently (Good).
- **Message Broker:** An intermediary program that translates messages from the formal messaging protocol of the sender to the formal messaging protocol of the receiver.
- **Side Effect:** When a function or expression modifies some state outside its local environment (e.g., writing to a database, charging a credit card). _Commands_ have side effects; _Queries_ do not.
- **State Transfer:** The architectural pattern where data is moved from one service to another via events, so the receiving service has a local copy of the data it needs.
- **Topic:** A category or feed name to which records (events) are published. Services "subscribe" to topics to hear specific types of events.
- **KTable / KStreams:** Libraries within the Kafka ecosystem used for processing streams of data. KTable manages state (tables), while KStreams handles flow.
