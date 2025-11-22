# Decomposition Strategies for Microservice Architecture

## 1. Introduction

This documentation outlines the process of breaking down (decomposing) a software application into smaller, manageable microservices. The goal is to move away from technical definitions and organize software around **business concerns**.

The content is based on the "FTGO" (Food To Go) application example—a food delivery platform—to illustrate these concepts.

---

## 2. The Three-Step Process

Defining a microservice architecture is not random; it follows a structured three-step process:

1.  **Identify System Operations:** Define what the application actually does from a user's perspective.
2.  **Identify Services:** Determine how to split the application into specific microservices using decomposition strategies.
3.  **Define Service APIs and Collaborations:** Decide how these services will speak to each other to complete the system operations.

---

## 3. Step 1: Identify System Operations

Before you can split an application, you must understand its requirements.

### The Concept

A **System Operation** is an abstraction of a request that the application must handle. It represents an external request (e.g., a user clicking "Buy" or a courier updating their location).

### The Workflow

1.  **High-Level Domain Model:** Create a visual map of the business objects (e.g., Consumers, Orders, Restaurants, Couriers).
2.  **Functional Requirements:** Look at user stories (e.g., "As a consumer, I want to place an order...").
3.  **Define Commands:** Translate these stories into specific system commands.

### FTGO Example

- **Actor:** Consumer
- **Story:** Creates an Order
- **Command:** `createOrder()`
- **Description:** The system creates an order record.

- **Actor:** Courier
- **Story:** Update Location
- **Command:** `noteUpdatedLocation()`
- **Description:** Updates the current GPS coordinates of the courier.

---

## 4. Step 2: Identify Services (Decomposition)

Once operations are defined, you must group them into services. There are two primary strategies for this:

### Strategy A: Decompose by Business Capability

This strategy comes from business architecture modeling, not software engineering.

- **What is a Business Capability?** It is "what" a business does to generate value. It focuses on business objects rather than technical functions.
- **How to identify them:** Analyze the organization's purpose, structure, and processes.
  - _Example:_ An insurance company has capabilities like "Underwriting" and "Claims Management."
  - _Example:_ An online store has "Order Management" and "Shipping."
- **The FTGO Capabilities Hierarchy:**
  - **Supplier Management:** Managing courier and restaurant info.
  - **Consumer Management:** Managing customer profiles.
  - **Order Taking & Fulfillment:** Managing the actual food orders.
  - **Accounting:** Billing consumers and paying restaurants.
- **Mapping:** Each capability (or group of related capabilities) becomes a Microservice (e.g., `Accounting Service`, `Delivery Service`).

**Pros & Cons:**

- **Benefit:** The architecture is stable because business fundamentals rarely change.
- **Drawback:** Can lead to "God Classes" (explained in Section 6) or inefficient communication between services.

### Strategy B: Decompose by Subdomain (Domain-Driven Design)

This strategy uses **Domain-Driven Design (DDD)** concepts to solve complex software problems.

- **Subdomains:** DDD breaks a complex domain into "subdomains"—distinct areas of expertise.
- **Bounded Context:** This is the scope within which a specific domain model applies. In microservices, **1 Service = 1 Bounded Context**.
- **The Approach:**
  1.  Analyze the business to find different areas of expertise.
  2.  Create a unique domain model for each area.
  3.  Map each subdomain to a service.

---

## 5. Step 3: Define Service APIs and Collaborations

Services cannot exist in isolation; they must work together.

### Analyzing Collaboration

For every system operation (from Step 1), determine:

1.  **The Entry Point:** Which service receives the initial request?
2.  **Collaborators:** Which other services serve as "helpers" to complete the request?

### Example: `createOrder()`

1.  **Consumer Service:** Verifies the consumer's details.
2.  **Restaurant Service:** Verifies the menu items and pricing.
3.  **Kitchen Service:** Creates a "Ticket" for the cooks.
4.  **Accounting Service:** Authorizes the credit card.

The **Order Service** acts as the coordinator, calling the APIs of the Consumer, Restaurant, Kitchen, and Accounting services to complete the single `createOrder()` operation.

---

## 6. Challenges & Solutions (Obstacles to Decomposition)

### Obstacle 1: Network Latency

- **Problem:** In a monolith, functions call each other instantly in memory. In microservices, they communicate over a network, which is slow.
- **Solution:** Use **Batch APIs** to fetch multiple objects in a single round trip to reduce network calls.

### Obstacle 2: Reduced Availability

- **Problem:** If Service A calls Service B synchronously (waiting for a reply), and Service B is down, Service A also fails.
- **Solution:** Use **Asynchronous Messaging** (e.g., message brokers like RabbitMQ or Kafka). Service A sends a message and moves on without waiting for an instant reply.

### Obstacle 3: The "God Class"

- **Problem:** In many applications, there is one massive class (e.g., `Order` or `User`) that is used by every part of the system. It creates a dependency nightmare.
  - _Example:_ In FTGO, a single `Order` class might hold data for billing, delivery location, kitchen prep time, and customer preferences.
- **Solution: Apply DDD (Bounded Contexts).**
  Instead of one giant `Order` class, create specific versions of "Order" for each service:
  - **Delivery Service:** Needs an `Order` model containing only pickup/drop-off time and address.
  - **Kitchen Service:** Needs an `Order` (or "Ticket") model containing only menu items and quantity.
  - **Billing Service:** Needs an `Order` model containing only prices and payment tokens.
  - _Result:_ Each service has its own simple model, eliminating the bloated God Class.

---

## 7. Glossary of Technical Terms

To ensure clarity, here are the definitions of key terms used in this architecture:

- **Microservice Architecture:** An approach to software development where software is composed of small, independent services that communicate over well-defined APIs.
- **Monolith:** A traditional software architecture where all components (UI, business logic, database access) are packed into a single, large application.
- **Decomposition:** The act of breaking a large system into smaller, functional pieces.
- **Domain-Driven Design (DDD):** A software design approach focusing on modeling software to match the complex reality of the business domain.
- **Bounded Context:** A central pattern in DDD. It defines a logical boundary within which a specific domain model is valid. It allows different parts of the system to have different definitions for the same term (e.g., "User" means "Buyer" in Sales context but "Employee" in HR context).
- **God Class:** An anti-pattern (bad practice) where a single class knows too much or does too much, making the code difficult to maintain.
- **Synchronous Communication (REST):** A communication method where the caller waits for a response before continuing (like a phone call).
- **Asynchronous Communication (Messaging):** A method where the caller sends a message and continues working without waiting for an immediate reply (like sending an email).
- **Sagas:** A design pattern used to manage data consistency across microservices in distributed transactions. Since you cannot use a standard database transaction across two different services, a Saga coordinates a sequence of local transactions.
- **CQRS (Command Query Responsibility Segregation):** A pattern that separates the code that reads data (Query) from the code that updates data (Command).

## 8. Summary

1.  **Organize by Business:** Microservices should be organized around business capabilities or subdomains, not technical layers (like "UI layer" or "Database layer").
2.  **Eliminate Bloat:** Use Domain-Driven Design to break apart "God Classes" so that services remain loosely coupled.
3.  **Plan Collaboration:** Carefully define APIs and choose between synchronous (REST) or asynchronous (Messaging) communication based on availability requirements.
