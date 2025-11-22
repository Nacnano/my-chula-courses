### **Section 1: Core Concepts & Definitions**

1.  **Question:** According to Ralph Johnson, how is Software Architecture defined simply?
    **Answer:** Architecture is about the "important stuff" (whatever that is).

2.  **Question:** In the context of the "Building Construction" analogy, if detailed design is the interior decoration, what is the architectural design?
    **Answer:** The foundation, structural columns, and depth of piles (High-level structure).

3.  **Question:** What is the primary difference between **Architecture Design** and **Detailed Design** regarding the level of abstraction?
    **Answer:** Architecture Design is High-level abstraction (Subsystems), while Detailed Design is Low-level abstraction (Object/Class design).

4.  **Question:** According to the slides, Architecture primarily addresses which type of requirements?
    **Answer:** Non-functional requirements (Quality Factors).

5.  **Question:** What are the key elements of an Architectural Style (as defined in the slides)?
    **Answer:** Components + Connectors + Constraints.

6.  **Question:** What is the difference between a "View" and a "Viewpoint"?
    **Answer:** A **View** is what you actually see (the diagram addressing specific concerns), whereas a **Viewpoint** is the template, specification, or rules for creating that view.

### **Section 2: Models & Diagrams (Crucial)**

7.  **Question:** What are the 4 levels in the **C4 Model**?
    **Answer:** 1. Context, 2. Containers, 3. Components, 4. Code.

8.  **Question:** Which metaphor does Simon Brown use to explain the C4 Model?
    **Answer:** Google Maps (Zoom In / Zoom Out).

9.  **Question:** In the C4 Model, which level is Simon Brown's "not recommended" or "on demand only" level?
    **Answer:** Level 4: Code (e.g., Class diagrams).

10. **Question:** In C4 terminology, what is a "Container"?
    **Answer:** An executable unit (e.g., Single-page app, Server-side web app, Database, Microservice) — _Note: NOT necessarily a Docker container._

11. **Question:** What are the 5 views in Kruchten’s **4+1 View Model**?
    **Answer:** Logical, Process, Development, Physical, and Scenarios (Use Case).

12. **Question:** Which view in the 4+1 model "ties" all the other four views together?
    **Answer:** Scenarios (Use Case View).

13. **Question:** Why is source code often considered a poor way to represent software architecture?
    **Answer:** It is too detailed, making it difficult to see the "big picture" or high-level components.

14. **Question:** In the C4 model, how should lines/relationships be drawn to avoid ambiguity (like the "Hub and Spoke" confusion)?
    **Answer:** Uni-directional lines with explicit text labels explaining the intent.

### **Section 3: Quality Attributes & Trade-offs**

15. **Question:** Martin Fowler refers to "Non-functional requirements" as what?
    **Answer:** Internal Quality.

16. **Question:** Give an example of an architectural **trade-off** mentioned in the slides regarding Security.
    **Answer:** High Security often trades off against Ease of Integration or Usability.

17. **Question:** If a system requires high performance and is tied to a specific hardware platform, which quality attribute is negatively affected?
    **Answer:** Portability.

18. **Question:** In the Google File System (GFS) vs. Altavista example, both performed the same function (web search). What made them architecturally different?
    **Answer:** Their Non-functional requirements (specifically Scalability and Reliability via distributed commodity servers).

### **Section 4: Risk & Cost Analysis (Calculations)**

19. **Question:** What does **FMEA** stand for?
    **Answer:** Failure Modes and Effects Analysis.

20. **Question:** What is the formula for calculating the **RPN** (Risk Priority Number) in FMEA?
    **Answer:** RPN = Severity (S) × Occurrence (O) × Detection (D).

21. **Question:** In FMEA, if a failure is very hard to detect before it happens, will the "Detection (D)" score be high or low?
    **Answer:** High (10 = undetected/hard to detect).

22. **Question:** What does **CBAM** stand for?
    **Answer:** Cost Benefit Analysis Method.

23. **Question:** When analyzing cost (CBAM), organizations often make the mistake of looking only at building costs. What should they also consider?
    **Answer:** Maintenance and upgrading costs (Long-term costs).

### **Section 5: Styles, Patterns, and ADL**

24. **Question:** What is the difference in scope between **Architectural Styles** and **GoF Design Patterns**?
    **Answer:** Architectural Styles are High-level design; GoF Patterns are Low-level (Object) design.

25. **Question:** The slides marked "Microservices" with a red heart. Is Microservices considered an Architectural Style or a Design Pattern?
    **Answer:** Architectural Style.

26. **Question:** What is an **ADL**?
    **Answer:** Architecture Description Language.

27. **Question:** Is UML considered an ADL?
    **Answer:** Yes, it is considered an alternative ADL.

28. **Question:** What is a cited shortcoming of using UML as an ADL?
    **Answer:** It focuses too much on implementation details (classes) rather than high-level structure, or lacks notion of entity restrictions.

### **Section 6: Case Study (Email Application)**

29. **Question:** In the Email Search case study, why did the "Version 1: Local log files" architecture fail as the company grew?
    **Answer:** Sequential searching (grep) became too slow and had high overhead as the number of servers increased.

30. **Question:** In "Version 3" of the Email Search architecture, what technology was used to solve the scalability issue?
    **Answer:** Map-Reduce (Hadoop) / Distributed Indexing.
