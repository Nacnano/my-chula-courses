# Domain-Driven Design (DDD): A Comprehensive Guide

**Domain-Driven Design (DDD)** is a software development approach that focuses on modeling software to match the complexity of a business domain. The primary goal is **Business-Tech Alignment**: ensuring the software design corresponds directly to input from domain experts, rather than being driven solely by technology choices.

---

## Part 1: Core Concepts & Philosophy

Before writing code, DDD emphasizes understanding the problem space.

### 1. The Domain

The "Domain" is the sphere of knowledge, influence, or activity around which the software logic revolves.

- **Core Domain:** The specific part of the business that provides the competitive advantage (e.g., for Netflix, the core domain is Content Delivery and Personalization, not just "playing video").
- **Goal:** You cannot create good banking software without understanding banking. The software must deeply plant its roots in the domain concepts.

### 2. Knowledge Crunching

Software development is a learning process. Developers must collaborate with **Domain Experts** (the business people) to extract knowledge.

- **Example (Flight Control System):**
  - _Initial thought:_ A plane moves from A to B.
  - _Expert Input:_ "No, we have specific vocabulary: Fixes, Routes, Latitude, Longitude, Deviations."
  - _Result:_ The diagram evolves from a simple line to a complex series of "Fixes" (3D points in the sky) projected onto a 2D map.

### 3. Ubiquitous Language

This is the single most important concept in DDD. It is a shared, common language used by **both** developers and domain experts.

- **The Problem:**
  - _Developers talk about:_ SQL, Classes, Abstract Factories, Tokens, Cloud.
  - _Experts talk about:_ Policies, Premiums, Routes, Altitudes, Deductibles.
  - _Result:_ Translation errors and bugs.
- **The Solution:** Use the **Ubiquitous Language** in the code, the database, the diagrams, and verbal conversation.
  - If the business calls it a "Flight Plan," the class should be named `FlightPlan`, not `RouteManagerObject`.
  - **Note:** This language effectively disappears "overnight." It requires consistent effort to define and maintain.

---

## Part 2: Strategic Design (The Big Picture)

In large projects, a single model cannot cover the entire enterprise without becoming a "Big Ball of Mud" (a messy, tangled system). Strategic design defines how to break the system down.

### 1. Bounded Contexts

A **Bounded Context** is a semantic boundary. It defines the range of applicability of a specific model.

- **Why it is needed:** The word "Ticket" means something different to the _Sales Team_ (a reservation) than it does to the _Support Team_ (a bug report).
- **Rule:** Inside a Bounded Context, the model must be strictly consistent. Outside the boundary, the terms can mean different things.
- **Implementation:** In microservices, one Bounded Context often equals one Service (e.g., Kitchen Service, Delivery Service).

### 2. Context Mapping

A **Context Map** is a document or diagram showing how different Bounded Contexts interact and translate data between each other.

#### Types of Relationships:

- **Shared Kernel:** Two teams agree to share a small subset of the model (code/database). High coordination required.
- **Customer-Supplier:** One team (Upstream/Supplier) feeds data to another (Downstream/Consumer). The Downstream team drives the requirements, but the Upstream team controls the timeline.
- **Conformist:** The Downstream team has no influence. They must conform to the Upstream model exactly as it exists, even if it's not perfect for them.
- **Anticorruption Layer (ACL):** The most defensive approach. The Downstream team creates a translation layer to isolate their clean internal model from a messy or incompatible Upstream model.
- **Open Host Service:** The Upstream system provides a standardized, public protocol (like a REST API or gRPC) for anyone to use, avoiding custom integration for every client.
- **Published Language:** Using a well-documented shared language (e.g., XML Schema, JSON Schema, Avro) as the medium of communication.
- **Separate Ways:** Deciding explicitly _not_ to integrate. Teams build their own specialized solutions to avoid the complexity of dependency.
- **Partnership:** Two teams succeed or fail together; they coordinate intimately on their models.

---

## Part 3: Tactical Design (The Building Blocks)

Once the domain is defined, "Tactical Design" provides the technical design patterns to build the model code (The Domain Layer).

### The Layered Architecture

To protect the domain knowledge, DDD uses a layered approach:

1.  **User Interface:** Displays info to the user.
2.  **Application Layer:** Coordinates tasks, delegates work to domain objects (thin layer, no business rules).
3.  **Domain Layer (The Core):** Represents business concepts and rules. **This is where the DDD patterns live.**
4.  **Infrastructure Layer:** Generic technical capabilities (database access, email sending, message queues).

### The Tactical Patterns

#### 1. Entities

Objects that have a distinct **Identity** that runs through time and different states.

- **Key Trait:** Two entities are different even if they have the same attributes, as long as their IDs are different.
- **Examples:** A `Person` (identified by ID card), a `Flight` (identified by flight number), an `Order`.

#### 2. Value Objects (VO)

Objects that describe a characteristic or attribute but have **No Identity**.

- **Key Traits:**
  - **Immutable:** You do not change a Value Object; you replace it with a new one.
  - **Equality:** Two VOs are equal if their _values_ are the same.
- **Context Matters:** An "Address" might be a Value Object in an e-commerce app (just a shipping label), but an Entity in a Utility Company system (where the house needs service tracking over 100 years).
- **Examples:** `Color` (RGB), `Money` (Amount + Currency), `DateRange`.

#### 3. Aggregates

A cluster of associated objects (Entities and Value Objects) that are treated as a **single unit for data changes**.

- **Aggregate Root:** The main Entity that controls access to the cluster. External objects can only hold references to the Root, not the internal parts.
- **Invariants:** Business rules that must always be true (e.g., "The sum of line items cannot exceed the Purchase Order limit"). The Root is responsible for enforcing these rules.
- **Transaction Boundary:** Everything inside the Aggregate changes together. If one part fails validation, the whole update fails.

#### 4. Services

Operations or behaviors that do not fit naturally into an Entity or Value Object.

- **Key Traits:** Stateless. They act as interfaces that coordinate domain activities.
- **Example:** `FundsTransferService` (Moving money between two Account entities).

#### 5. Repositories

A mechanism to encapsulate storage, retrieval, and search behavior.

- **Purpose:** To decouple the Domain layer from the Infrastructure layer. The domain model shouldn't know you are using SQL or NoSQL.
- **Metaphor:** Think of a Repository as an in-memory collection. You `add()` or `remove()` items, and the repository handles the database details behind the scenes.

#### 6. Factories

Encapsulate the complex logic required to **create** objects (especially Aggregates).

- **Why:** Creating a complex object often requires validation and setup that shouldn't clutter the object's own logic.
- **Types:** Factory Method (on the Aggregate Root) or Standalone Factory.

#### 7. Domain Events

A representation of something meaningful that **happened** in the domain (past tense).

- **Purpose:** To decouple systems. When 'A' happens, an event is published, and other parts of the system can listen and react.
- **Examples:** `OrderPlaced`, `PaymentReceived`, `BookAddedToCatalog`.

---

## Part 4: Practical Application & Migration

### From Monolith to Microservices

DDD is the standard method for breaking down Monolithic applications.

1.  **Analyze Capabilities:** Identify core business capabilities (e.g., Order Taking, Logistics, Accounting).
2.  **Define Bounded Contexts:** Create a context for each capability (e.g., Order Context, Kitchen Context).
3.  **Map the Contexts:** Use a Context Map to define how these services talk (e.g., Order Service maps data to Kitchen Service).
4.  **Create Models:** Inside each service, build a distinct Domain Model (Entities, VOs, Aggregates) specific to that context.
    - _Example:_ The `Order` class in the "Order Service" contains pricing and customer info. The `Order` (or `Ticket`) class in the "Kitchen Service" only contains item names and prep times. They share the same ID but are different models.

---

## Glossary of Key Terms

- **Invariants:** Consistency rules that must be maintained whenever data changes.
- **Model-Driven Design:** Designing your code structure (classes/methods) to look exactly like your whiteboard diagrams.
- **Decomposition:** The process of breaking a large system into smaller, manageable Bounded Contexts.
- **Communication Latency:** The difficulty and slowness in understanding caused by using different vocabularies. DDD reduces this via Ubiquitous Language.
