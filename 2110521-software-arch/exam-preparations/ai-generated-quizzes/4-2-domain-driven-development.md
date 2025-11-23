### Section 1: Core Concepts & Philosophy

**1. What is the primary goal of Domain-Driven Design?**

- **Answer:** To align the software design with the business domain (Business-Tech alignment) and ensure the software matches the complexity of the real world.

**2. What is "Ubiquitous Language"?**

- **Answer:** A common, shared language used by both developers and domain experts in all conversations, documentation, and code.

**3. Who must developers collaborate with to effectively "crunch knowledge"?**

- **Answer:** Domain Experts.

**4. Why is it risky for developers to use only technical terms (like SQL, Class, Token) without domain terms?**

- **Answer:** It creates a translation gap between the code and the business requirements, leading to misunderstandings and bugs.

**5. In the "Flight Control" example, why was a simple line from A to B insufficient?**

- **Answer:** Because the domain experts view flights as a complex series of 3D "fixes" and "routes," not just a simple trajectory.

---

### Section 2: Strategic Design (The Big Picture)

**6. What is a "Bounded Context"?**

- **Answer:** A boundary that defines the specific range within which a particular domain model is applicable and valid.

**7. What is a "Context Map"?**

- **Answer:** A document or diagram that outlines the different Bounded Contexts and the relationships/data flow between them.

**8. Why should you avoid a "Big Ball of Mud" (Single Unified Model) in large projects?**

- **Answer:** Because different parts of a large system often have conflicting definitions for the same term, making the software buggy and difficult to maintain.

**9. In Context Mapping, what is a "Shared Kernel"?**

- **Answer:** A relationship where two teams agree to share and maintain a small, common subset of the domain model (code/database).

**10. What is the "Customer-Supplier" relationship?**

- **Answer:** A relationship where the Downstream team (Customer) depends on the Upstream team (Supplier), and the Supplier must provide what the Customer needs.

**11. What is the "Conformist" pattern?**

- **Answer:** When the Downstream team has no influence over the Upstream team, so they simply adopt (conform to) the Upstream model "as is."

**12. What is an "Anticorruption Layer" (ACL)?**

- **Answer:** A translation layer that isolates a client's model from an external system's model to prevent "pollution" from the external design.

**13. What is an "Open Host Service"?**

- **Answer:** When a subsystem defines a standardized public protocol (interface) that allows many other systems to integrate with it easily.

**14. What is a "Published Language"?**

- **Answer:** A well-documented shared language (like XML or JSON Schema) used as a common medium of communication between contexts.

**15. If two teams decide to build specialized solutions independently with no integration, what is this pattern called?**

- **Answer:** Separate Ways.

---

### Section 3: Tactical Design (Entities & Value Objects)

**16. What is the defining characteristic of an "Entity"?**

- **Answer:** It has a unique Identity (ID) that remains consistent throughout the life of the software, even if its attributes change.

**17. Give two examples of an Entity.**

- **Answer:** A Customer (Customer ID), An Order (Order ID), or A Flight (Flight Code).

**18. What is the defining characteristic of a "Value Object"?**

- **Answer:** It creates meaning through its attributes (values) but has no unique identity.

**19. If two Value Objects have the exact same attributes, are they considered equal?**

- **Answer:** Yes.

**20. Should Value Objects be mutable or immutable?**

- **Answer:** Immutable (if you want to change the value, you replace the object with a new one).

**21. In a shipping application, "Address" is likely a Value Object. When might "Address" be an Entity?**

- **Answer:** In a Utility/Electric company system, where the location itself must be tracked over decades regardless of who lives there.

---

### Section 4: Aggregates & Services

**22. What is an "Aggregate"?**

- **Answer:** A cluster of associated objects (Entities and Value Objects) treated as a single unit for data changes.

**23. What is the "Aggregate Root"?**

- **Answer:** The single main Entity inside an Aggregate that is the only entry point accessible from the outside.

**24. What are "Invariants" in an Aggregate?**

- **Answer:** Business rules that must always be true and consistent within the Aggregate boundaries (e.g., "Order total cannot be negative").

**25. If you delete an Aggregate Root, what happens to the objects inside that Aggregate?**

- **Answer:** They must all be deleted (cascade delete).

**26. What is the purpose of a "Service" in DDD?**

- **Answer:** To represent behavior or operations that do not naturally fit into an Entity or Value Object.

**27. Should Domain Services generally be stateful or stateless?**

- **Answer:** Stateless.

---

### Section 5: Repositories, Factories, & Architecture

**28. What is the main responsibility of a "Repository"?**

- **Answer:** To encapsulate the logic required to access the database/storage, allowing the domain to remain focused on the model, not SQL.

**29. What is the main responsibility of a "Factory"?**

- **Answer:** To encapsulate the complex logic required to create/construct objects or Aggregates.

**30. In the Layered Architecture, which layer should contain the business logic?**

- **Answer:** The Domain Layer (or Model Layer).
