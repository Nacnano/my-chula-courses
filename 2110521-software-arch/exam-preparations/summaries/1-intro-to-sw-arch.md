# Software Architecture: Course Documentation

## 1. Introduction & Context (5W2H)

The course frames the study of Software Architecture (SW Arch) using the **5W2H** method to ensure a holistic understanding of the subject.

- **WHAT:** The definition and structure of the system.
- **WHY:** The driving forces (Quality Factors/Non-functional requirements).
- **WHEN:** During the high-level design phase.
- **WHERE:** In the development office/environment.
- **WHO:** The Software Architect.
- **HOW:** Using documentation, models, and styles (e.g., C4, UML).
- **HOW MUCH:** The cost-benefit analysis of architectural decisions.

**Note on Scope:** This semester focuses heavily on **Microservices** and **Group Projects**. There is no midterm exam; assessment is based on quizzes, tutorials, a term project (50%), and a final exam.

---

## 2. WHAT is Software Architecture?

### Definitions

Software Architecture is difficult to define perfectly, but several authoritative definitions exist:

1.  **Ralph Johnson:** "Architecture is about the important stuff. Whatever that is." (Implies that architecture deals with the decisions that are costly to change later).
2.  **IEEE 1471-2000:** The fundamental organization of a system embodied in its **components**, their **relationships** to each other and to the **environment**, and the **principles** guiding its design and evolution.
3.  **Bass, Clements, Kazman:** The structure of the system, comprising software elements, their **externally visible properties**, and the relationships among them.

### Components and Connectors

At its core, architecture represents a system using:

- **Components:** Units that encapsulate a set of functionalities (computation/storage).
- **Connectors:** Mechanisms that realize the runtime interaction between components (e.g., API calls, database connections).

---

## 3. Core Concept: Abstraction and Modeling

### What is a Model?

A **Model** is a representation of something we are interested in. We use models to communicate because the "real thing" (the actual code or the physical building) is often too complex or unavailable to show in its entirety.

### Levels of Abstraction

Architecture relies on **High Abstraction**.

- **High Abstraction:** Focuses on the "Big Picture." It hides details to reduce complexity.
  - _Example:_ A drawing of a human face showing only eyes, nose, and mouth.
  - _In Software:_ A diagram showing System A talking to System B without showing the specific Java classes involved.
- **Low Abstraction:** Focuses on details.
  - _Example:_ A 3D scan of the pores on the skin of a human face.
  - _In Software:_ Source code, Class diagrams with all attributes and methods visible.

**Key Takeaway:** Architectural design is **High-level design**. If you include too much detail (like specific object design), it becomes "Detailed Design," not Architecture.

---

## 4. HOW: Representing Architecture

We cannot just look at Source Code to understand Architecture—it is too detailed and hard to read. We need visual diagrams.

### Architectural Views vs. Viewpoints

- **View:** What you actually see (the diagram itself). It addresses a specific set of concerns for a specific audience.
- **Viewpoint:** The "template" or specification for how to create a view. It defines the notation, rules, and modeling techniques.
  - _Analogy:_ The "Viewpoint" is the camera setting (Portrait Mode); the "View" is the photo taken.

### The 4+1 View Model (Philippe Kruchten)

A classic approach to describing architecture using four specific views, tied together by scenarios:

1.  **Logical View:** End-user functionality.
2.  **Process View:** Integrators, performance, scalability.
3.  **Development View:** Programmers, software management.
4.  **Physical View:** System engineers, topology, communications.
5.  **+1 Scenarios (Use Case View):** Ties the other four together showing how they interact.

### The C4 Model (Recommended Framework)

Created by Simon Brown, the C4 model is the standard used in this course. It uses a "Zoom In" approach, similar to Google Maps (Continent -> Country -> City -> Street).

**The 4 Levels of C4:**

1.  **Level 1: System Context:**
    - _Scope:_ The Big Picture.
    - _Shows:_ The software system, the users (actors), and external dependencies (e.g., Email System, Mainframe).
    - _Audience:_ Non-technical business people and developers.
2.  **Level 2: Containers:**
    - _Scope:_ Zoom into the Software System.
    - _Definition:_ A "Container" is a deployable unit (e.g., A Single Page App, a Server-side Web App, a Database, a Mobile App). **It is NOT just a Docker container.**
    - _Shows:_ Technology choices (e.g., Java/Spring, React, Oracle).
3.  **Level 3: Components:**
    - _Scope:_ Zoom into a specific Container.
    - _Shows:_ Logical components (groupings of functionality) inside the application.
4.  **Level 4: Code:**
    - _Scope:_ Zoom into a Component (e.g., UML Class diagrams).
    - _Advice:_ **Not recommended** for general architecture documentation because it changes too frequently and is too detailed. Only use "on demand."

**Diagramming Best Practices (Important):**

- **Legends:** Every diagram _must_ have a key/legend explaining shapes and colors.
- **Labeled Lines:** Never draw a line without text. Explain the _intent_ (e.g., "Sends JSON data," "Authenticates user").
- **Unidirectional Flows:** Prefer one-way lines to show the primary flow of data or dependency.
- **Tools:** Structurizr and PlantUML are recommended (text-to-diagram tools).

---

## 5. WHY: Quality Factors (Non-Functional Requirements)

Architecture is primarily concerned with **Non-Functional Requirements (NFRs)**, also known as **Quality Attributes** or "Internal Quality."

- **Functional Requirements:** What the system _does_ (e.g., "Search for a webpage"). Use Cases describe this.
- **Non-Functional Requirements:** How the system _behaves_ (e.g., "Search results must appear in < 0.5 seconds"). Architecture describes this.

**Common Quality Factors:**

- **Scalability:** Can it handle more users?
- **Security:** Is data safe?
- **Performance:** Is it fast?
- **Modifiability:** Is it easy to change?
- **Availability:** Is it always online (e.g., 24/7)?

### Trade-offs

An architect's job is to manage trade-offs. You usually cannot maximize all qualities at once.

- _Example:_ High Security (complex encryption) might lower Performance (speed).
- _Example:_ High Availability (redundancy) increases Cost.

---

## 6. Risk and Cost Analysis

### FMEA (Failure Modes and Effects Analysis)

A structured method to identify risks in the architecture.

- **Failure Mode:** What could go wrong? (e.g., Database bottleneck).
- **Effect:** What happens if it fails? (e.g., System slowdown).
- **Cause:** Why would it happen? (e.g., Poor indexing).
- **S (Severity):** Impact rating (1-10).
- **O (Occurrence):** Likelihood rating (1-10).
- **D (Detection):** Ability to detect before failure (1-10).
- **RPN (Risk Priority Number):** $S \times O \times D$. Higher RPN = Higher priority to fix.

### CBAM (Cost Benefit Analysis Method)

A method to decide if an architectural change is worth the money.

- It weighs the **Cost** of implementing a strategy against the **Benefit** (improvement in Quality Attributes).
- Don't just look at building costs; look at maintenance and upgrade costs over the long term.

---

## 7. Case Study: Evolution of an Email Search App

The slides use an example of an email log search system to show how architecture evolves to meet changing NFRs (specifically Volume and Scalability).

1.  **Version 1: Local Log Files (Scripting)**
    - _Design:_ A script uses SSH to connect to every server and `grep` the logs.
    - _Pros:_ Cheap, easy to build initially.
    - _Cons:_ Slow sequential search. As servers increase, the system becomes unusable.
2.  **Version 2: Central Database**
    - _Design:_ Logs are shipped to a central Relational Database (SQL).
    - _Pros:_ Fast search, easy UI.
    - _Cons:_ The database becomes a bottleneck. High CPU/Disk load. Single point of failure.
3.  **Version 3: Indexing Cluster (MapReduce/Hadoop)**
    - _Design:_ Distributed file system. Logs are processed in parallel (Map) and combined (Reduce).
    - _Pros:_ Highly scalable (can handle Terabytes of data), reliable.
    - _Cons:_ High complexity, latency (indexes might be 15 mins old), higher cost.

**Lesson:** All three perform the same _Function_ (Searching logs), but they have vastly different _Architectures_ regarding Scalability and Performance.

---

## 8. Technical Terminology Glossary

- **ADL (Architecture Description Language):** Formal languages (like Acme, ArchC) used to describe architecture mathematically or strictly. While UML is an alternative, specific ADLs are used for things like processor design.
- **Architectural Style:** A high-level pattern of organization (e.g., Layered, Pipe and Filter, Microservices, SOA).
  - _Contrast:_ **Design Patterns** (GoF) are _low-level_ solutions for specific coding problems (e.g., Singleton, Factory). Styles are _high-level_ system structures.
- **Microservices:** An architectural style where an application is structured as a collection of loosely coupled services. (Highly emphasized this term).
- **UML Component Diagram:** Shows the wiring of components (runtime structure).
- **UML Deployment Diagram:** Shows how software maps to hardware.
- **ADR (Architectural Decision Record):** A document that captures an important architectural decision, along with its context and consequences.
