### Section 1: Core Definitions & Acronyms (Slides 1-8)

**1. What does the acronym ADR stand for?**
**Answer:** Architectural Decision Record.

**2. What is the definition of an "Architectural Decision" (AD)?**
**Answer:** A software design choice that addresses a significant requirement.

**3. What is the difference between an ADR and an ADL?**
**Answer:** An ADR is a single document recording one decision; an ADL (Architectural Decision Log) is the collection of all ADRs for a project.

**4. What is an ASR (Architecturally Significant Requirement)?**
**Answer:** A requirement that has a measurable effect on a software system’s architecture.

**5. AKM stands for Architecture Knowledge Management. What does it include?**
**Answer:** It includes the management of ADs, ADRs, ADLs, and ASRs.

### Section 2: Writing Good ADRs & Best Practices (Slides 9, 21-23)

**6. Why should ADRs be "Immutable records"?**
**Answer:** Once published/accepted, an ADR should not be altered. If a decision changes, a new ADR should be created to supersede the old one.

**7. What is the "Point in Time" characteristic of a good ADR?**
**Answer:** The ADR must identify _when_ the decision was made.

**8. In the "Context" section of an ADR, what should be described besides technical facts?**
**Answer:** The organization’s situation, business priorities, and the team's social/skill makeup.

**9. When writing the "Consequences" section, what approach should be avoided?**
**Answer:** Do not simply list "Pros" and "Cons"; instead, describe the resulting context and what needs to be done (active voice).

**10. What is a recommended best practice regarding the "Ownership" of ADRs?**
**Answer:** Each project should be empowered to create and own its ADRs.

### Section 3: The ADR Process (Slides 10-16)

**11. Before writing an ADR, what visual technique can be used to explore options and arguments collaboratively?**
**Answer:** Dialogue Mapping.

**12. Why is "Decision Enactment" (Enforcement) important?**
**Answer:** Because a decision is useless if it is not communicated to stakeholders and enforced via code reviews or coding styles.

**13. If a decision is made but the team lacks information, what should they maintain alongside the Product TODO list?**
**Answer:** A "Decision TODO list."

### Section 4: Templates (Nygard vs. Tyree/Akerman) (Slides 26-28, 58)

**14. In the Michael Nygard template, what are the three standard "Status" options?**
**Answer:** Proposed, Accepted, and Deprecated (or Superseded).

**15. In the Tyree & Akerman template, what is the difference between "Positions" and "Argument"?**
**Answer:** "Positions" lists the options considered (alternatives), while "Argument" outlines _why_ a specific position was selected.

**16. Which section of the Tyree & Akerman template captures the schedule, cost, and technology factors known at the time of decision?**
**Answer:** Assumptions.

**17. Which ADR template is described as "more sophisticated" and suitable for traditional software engineering?**
**Answer:** The Tyree and Akerman template.

**18. Which ADR template is described as "Simple and Popular" and often used in Agile communities?**
**Answer:** The Michael Nygard template.

### Section 5: Case Study Examples from Slides (Slides 30-56)

**19. In the "Environment Variable Configuration" example, what "Factor" framework inspired the decision?**
**Answer:** The 12-Factor App (or 15-Factor App).

**20. In the "CSS Framework" example, why was Semantic UI rejected?**
**Answer:** Because it depended on jQuery (which was an "anti-pattern" for their modern tech stack).

**21. According to the "Monorepo vs. Polyrepo" example, when should you choose a Monorepo?**
**Answer:** When the organization/team is relatively small and rapid iteration is a higher priority than stability.

**22. According to the "Monorepo vs. Polyrepo" example, when should you choose a Polyrepo?**
**Answer:** When the organization is large and sustaining stability is a higher priority than rapid iteration.

**23. In the "Programming Languages" example, why was Rust chosen over C/C++?**
**Answer:** Because Rust offers better memory safety while maintaining high performance.

### Section 6: Architectural Theory & Distributed Systems (Slides 66-76)

**24. Name two examples of "Monolithic" architectural styles.**
**Answer:** Layered architecture, Pipeline architecture, or Microkernel architecture.

**25. Name two examples of "Distributed" architectural styles.**
**Answer:** Service-based, Event-driven, Space-based, Service-oriented, or Microservices.

**26. Generally, what do Distributed architectures promote better than Monoliths?**
**Answer:** Performance, Scalability, and Availability.

**27. What is "Fallacy #1" of distributed systems?**
**Answer:** The Network is Reliable.

**28. What is "Fallacy #2" of distributed systems?**
**Answer:** Latency is Zero.

**29. What is "Fallacy #7" regarding transport cost?**
**Answer:** Transport Cost is Zero (It is a fallacy because moving data costs money/resources).

**30. What is "Fallacy #8" regarding network hardware/software?**
**Answer:** The Network is Homogeneous (It is a fallacy because networks are usually heterogeneous/mixed).
