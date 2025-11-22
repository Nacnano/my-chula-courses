# Comprehensive Guide to Architectural Decision Records (ADR)

## 1. Introduction: What is an ADR?

An **Architectural Decision Record (ADR)** is a document that captures an important choice a software team makes regarding a significant aspect of their software architecture. It explains **what** decision was made, **why** it was made, and the **context** surrounding it.

Think of it as a "flight recorder" for a software project. If a new developer joins the team two years from now and asks, _"Why did we choose Rust instead of C++?"_, the ADR provides the answer so history doesn't have to be repeated or guessed.

### Core Concepts & Acronyms

To understand ADRs, you must understand the related terminology (often referred to as **AKM** or Architecture Knowledge Management):

- **AD (Architectural Decision):** The actual software design choice that addresses a major requirement (e.g., "We will use a Relational Database").
- **ADR (Architectural Decision Record):** The physical document or file that records the AD, its context, and its consequences.
- **ADL (Architectural Decision Log):** The collection (folder, repository, list) of all ADRs created for a project.
- **ASR (Architecturally Significant Requirement):** A requirement that has a measurable impact on the system's architecture (e.g., "The system must handle 1 million concurrent users"). These usually drive the need for an AD.

---

## 2. When is a Decision "Architecturally Significant"?

Not every choice needs an ADR (e.g., changing a button color). A decision is significant if it impacts:

1.  **Structure:** Patterns or styles (e.g., choosing Microservices vs. Monolith).
2.  **Non-Functional Requirements (NFRs):** Security, high availability, latency, or fault tolerance.
3.  **Dependencies:** How components couple with one another.
4.  **Interfaces:** How services access and talk to each other.
5.  **Construction Techniques:** Selection of major libraries, frameworks, tools, or build processes.

**Rule of Thumb:** If the decision is hard to reverse or has a high cost of change, write an ADR.

---

## 3. The ADR Lifecycle

Implementing ADRs involves a process, not just writing a document.

### Phase 1: Decision Identification

- **Trigger:** The team realizes a choice must be made (e.g., "We need a frontend framework").
- **Action:** Add this to a "Decision TODO list" (similar to a product backlog).
- **Questions to ask:** How urgent is this? Can we wait for more information?

### Phase 2: Decision Making

- **Method:** Use collaborative techniques.
- **Dialogue Mapping:** A visual technique to map out the **Issue**, possible **Positions** (solutions), **Arguments** (Pros/Cons), and the final decision. This ensures all viewpoints are heard before writing the document.

### Phase 3: Decision Enactment & Enforcement

- A decision on paper is useless if not followed.
- **Communication:** The decision must be accepted by stakeholders.
- **Enforcement:** Use code reviews to ensure developers are following the ADR (e.g., if the ADR says "No jQuery," reject code containing jQuery).

### Phase 4: Documentation (Writing the ADR)

- Store ADRs in a central location (Git repository, Wiki, or Jira).
- Use a standard template (see Section 5).

---

## 4. How to Write a Good ADR

A high-quality ADR is immutable (you don't edit old ones; you create new ones to supersede them) and specific.

### The "Context" Section

**Do:** Explain the organization's situation, business priorities, and team skill set.

- _Example:_ "Our team is proficient in JavaScript but has no experience in Go. We need to launch in 3 months."

### The "Consequences" Section

**Do:** Use active voice and describe the resulting state.

- _Good:_ "We need to start doing X instead of Y. This requires us to train the team on Z."
  **Don't:** Just list generic "Pros and Cons."
  **Do:** Mention follow-up tasks (e.g., "We must update the CI/CD pipeline").

---

## 5. Common ADR Templates

There are two popular styles of recording decisions.

### A. The Michael Nygard Template (Lightweight/Agile)

Best for teams that want speed and simplicity.

1.  **Title:** Short and unique.
2.  **Context:** The forces at play (facts, social/technical constraints).
3.  **Decision:** Full sentences using active voice ("We will...").
4.  **Status:** Proposed, Accepted, or Deprecated.
5.  **Consequences:** The positive and negative outcomes of this decision.

### B. The Tyree & Akerman Template (Detailed/Corporate)

Best for complex decisions requiring strict auditing or justification.

- **Summary:** Issue, Decision, Status, Group.
- **Details:**
  - _Assumptions:_ What we believe to be true right now.
  - _Constraints:_ Hard limits (budget, secrets management).
  - _Positions:_ Alternative options considered.
  - _Argument:_ Why the selected position is best.
  - _Implications:_ What this decision costs us (training, complexity).
- **Related:** Links to other decisions, requirements, or artifacts.

---

## 6. Real-World ADR Examples (From Slides)

### Example 1: Environment Variable Configuration

- **Issue:** How to configure the app for different environments (Dev, Test, Prod)?
- **Decision:** Use `.env` files (following the "12-Factor App" methodology).
- **Argument:** It is a standard industry practice, keeps secrets out of version control, and is simple.
- **Implication:** Need to ensure `.env` files are added to `.gitignore` so secrets aren't leaked.

### Example 2: Frontend Framework Selection

- **Issue:** Need a fast, reliable, responsive web app framework.
- **Constraints:** Avoid "jQuery" (it's outdated and interferes with modern Virtual DOMs like React).
- **Options Considered:** Bootstrap, Semantic UI, Tachyons, Bulma.
- **Decision:** Chosen **Bulma**.
- **Reasoning:** Semantic UI depended heavily on jQuery (a "hard no"). Bulma is lightweight, modern, and has the necessary components.

### Example 3: Monorepo vs. Polyrepo

- **Issue:** How to organize Git repositories?
- **Decision:**
  - Use **Monorepo** (one giant repo) for small teams/projects where rapid iteration is the priority.
  - Use **Polyrepo** (many small repos) for large organizations where stability is the priority.
- **Implication:** Moving from Monorepo to Polyrepo later is a massive DevOps task, so this decision is significant.

### Example 4: Programming Languages

- **Decision:** **TypeScript** for Frontend; **Rust** for Backend.
- **Reasoning:**
  - _TypeScript:_ Adds safety to JavaScript without losing the ecosystem.
  - _Rust:_ Provides memory safety and high performance compared to C++, though it has a steeper learning curve.

---

## 7. Background: Architectural Styles & Distributed Systems

The documentation concludes with context on _why_ these decisions are hard. It usually comes down to choosing between **Monolithic** vs. **Distributed** architectures.

### Architectural Styles

- **Monolith:** All code in one place. Easier to build initially but harder to scale.
- **Distributed:** (Microservices, Event-driven). Better scalability and fault tolerance, but significantly higher complexity.

### The 8 Fallacies of Distributed Computing

When writing ADRs for distributed systems, you must avoid falling for these common lies/mistakes:

1.  **The Network is Reliable:** It isn't. Switches fail, cables get cut.
2.  **Latency is Zero:** Data takes time to travel.
3.  **Bandwidth is Infinite:** You can clog the network.
4.  **The Network is Secure:** Assume hackers are watching traffic.
5.  **Topology Never Changes:** Servers move, IPs change.
6.  **There is Only One Administrator:** No, many people touch the system.
7.  **Transport Cost is Zero:** Moving data costs money (cloud egress fees) and processing power.
8.  **The Network is Homogeneous:** Not all hardware/software is the same version or brand.
