### Section 1: Fundamentals & Concepts

1.  **Question:** In traditional CRUD operations, what happens to the old data when a user updates a record?
    **Answer:** It is overwritten and lost.

2.  **Question:** What is the fundamental definition of Event Sourcing?
    **Answer:** Saving every change to the system as an event so the full history can be rebuilt later.

3.  **Question:** Unlike CRUD, which stores the _current state_, what does Event Sourcing store?
    **Answer:** A sequence of immutable events (changes).

4.  **Question:** What is an "Aggregate"?
    **Answer:** One main object or entity (like an Order or Account) that acts as a consistency boundary.

5.  **Question:** What do we call the specific list of events associated with a single Aggregate?
    **Answer:** An event stream.

6.  **Question:** In the example `UserAddressChanged`, what specific data should be recorded inside the event?
    **Answer:** The old address and the new address.

### Section 2: Architecture (Projections & Snapshots)

7.  **Question:** What is a "Projection" (or Read Model)?
    **Answer:** A view or database table built from past events that is optimized for easy reading/querying.

8.  **Question:** Why do we need Projections instead of just reading from the Event Store?
    **Answer:** Raw events are difficult to query efficiently; Projections show the calculated current state.

9.  **Question:** What is a "Snapshot"?
    **Answer:** Saving the full state of an object at a specific point in time.

10. **Question:** What is the primary purpose of using Snapshots?
    **Answer:** Performance (it speeds up loading by avoiding the need to replay the entire history of events).

11. **Question:** If a system uses Snapshots, how does it load an object?
    **Answer:** It loads the last snapshot and then applies only the events that occurred _after_ that snapshot.

### Section 3: CQRS (Command Query Responsibility Segregation)

12. **Question:** What does CQRS stand for?
    **Answer:** Command Query Responsibility Segregation.

13. **Question:** In a CQRS architecture, what is the responsibility of the "Write" side?
    **Answer:** Handling commands that change data and saving events.

14. **Question:** In a CQRS architecture, what is the responsibility of the "Read" side?
    **Answer:** Providing simple views (projections) for queries.

15. **Question:** In the example flow, when a user adds an item, where does the Read Database get its updated info?
    **Answer:** From the projection, which updates based on the `ItemAdded` event stored in the Event Store.

### Section 4: Consistency & Transactions (2PC vs. Event Sourcing)

16. **Question:** What is "Two Phase Commit" (2PC) used for?
    **Answer:** Ensuring that multiple distributed systems agree before committing a transaction to keep data consistent.

17. **Question:** What are the two specific phases of 2PC?
    **Answer:** Prepare and Commit.

18. **Question:** What is a major performance disadvantage of using 2PC?
    **Answer:** It is slow because the coordinator must wait for all systems to confirm they are ready.

19. **Question:** What happens in a 2PC process if one participant fails or says "No" during the Prepare phase?
    **Answer:** The transaction is aborted (Rollback), and no changes are saved.

20. **Question:** How does Event Sourcing achieve consistency _without_ using 2PC?
    **Answer:** By treating the saving of a single event as an "atomic" (single, complete) action.

21. **Question:** In an Event Sourcing system, after a `PaymentCompleted` event is saved, how do other services (like Inventory) get updated?
    **Answer:** They read the event from the store and update their own data independently (Eventual Consistency).

### Section 5: Ordering & Mechanics

22. **Question:** Why are "Ordering Guarantees" critical in Event Sourcing?
    **Answer:** Because processing events in the wrong order (e.g., Checkout before Add Item) will result in an incorrect final state.

23. **Question:** What is the function of the "Event Bus"?
    **Answer:** To transport or publish events so other parts of the system (like Read Models or other microservices) can react to them.

24. **Question:** What does "Replay" mean in the context of Event Sourcing?
    **Answer:** Reprocessing past events to rebuild the state of the system or to fix/regenerate a Read Model.

25. **Question:** Where are all the events physically saved?
    **Answer:** In the Event Store.

### Section 6: Benefits & Challenges

26. **Question:** What is the "Time Travel" benefit of Event Sourcing?
    **Answer:** The ability to rebuild the system state as it existed at any specific point in the past.

27. **Question:** How does Event Sourcing help with debugging or auditing?
    **Answer:** Since no history is overwritten, you can track exactly how, when, and why a change occurred.

28. **Question:** Name one benefit of Event Sourcing regarding Microservices.
    **Answer:** Events can be easily shared across different microservices to keep them synchronized.

29. **Question:** What is a major disadvantage regarding the complexity of queries in Event Sourcing?
    **Answer:** You cannot easily query the current state directly from the event store; you must build and maintain separate Read Models.

30. **Question:** What is "Eventual Consistency" as a disadvantage/challenge?
    **Answer:** The Read database might not be updated instantly after a write, causing a slight delay before the user sees the new data.
