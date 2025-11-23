### **Topic: The Problem & API Composition Pattern**

1.  **Question:** In a microservice architecture, why is querying data across multiple services difficult compared to a monolithic architecture?
    **Answer:** Because each service has a private database, preventing the use of standard SQL `JOIN`s.

2.  **Question:** What are the two primary patterns for implementing queries in microservices?
    **Answer:** The API Composition pattern and the Command Query Responsibility Segregation (CQRS) pattern.

3.  **Question:** Which query pattern is considered the simplest and should be used whenever possible?
    **Answer:** The API Composition pattern.

4.  **Question:** What are the two main participants in the API Composition pattern?
    **Answer:** The API Composer and the Provider Services.

5.  **Question:** If an API Composer is implemented inside a web application (the client), what is the main network-related drawback?
    **Answer:** It is inefficient for clients outside the firewall (slower network) to make multiple requests.

6.  **Question:** In which architectural component is it most efficient to implement the API Composer for external mobile clients?
    **Answer:** In the API Gateway.

7.  **Question:** To optimize an API Composer, should calls to provider services be sequential or parallel?
    **Answer:** Parallel (whenever possible).

8.  **Question:** What specific programming model is recommended for writing efficient API Composition logic?
    **Answer:** A Reactive programming model (using events/promises instead of blocking threads).

9.  **Question:** How does the API Composition pattern affect the overall availability of a specific operation?
    **Answer:** It reduces availability (the risk of failure increases with the number of services involved).

10. **Question:** Why is the API Composition pattern inefficient for complex queries involving large datasets?
    **Answer:** It requires performing an inefficient "in-memory join" of large datasets retrieved from multiple services.

### **Topic: CQRS Concepts & Motivation**

11. **Question:** What does the acronym CQRS stand for?
    **Answer:** Command Query Responsibility Segregation.

12. **Question:** In CQRS, what is the responsibility of the "Command" side?
    **Answer:** Creating, updating, and deleting data (Writes).

13. **Question:** In CQRS, what mechanism does the Command side use to notify the Query side of changes?
    **Answer:** It publishes Events.

14. **Question:** What is the primary motivation for using CQRS regarding database selection?
    **Answer:** It allows you to choose a database optimized for reading/querying (e.g., a search engine or graph DB) rather than writing.

15. **Question:** If the `Delivery Service` and `Accounting Service` do not store the data required to filter a query (e.g., filtering by "Menu Item"), which pattern solves this?
    **Answer:** CQRS (by maintaining a joined view that includes the Menu Item).

16. **Question:** For a geospatial query like `findAvailableRestaurants()`, why is CQRS often better than API Composition?
    **Answer:** Because the service owning the data might use a database that does not efficiently support geospatial (location-based) queries.

17. **Question:** What type of database consistency does CQRS primarily rely on?
    **Answer:** Eventual Consistency.

### **Topic: Designing CQRS Views & Databases**

18. **Question:** What are the three sub-modules of a CQRS View module?
    **Answer:** Event handlers, Data access module (DAO), and Query API.

19. **Question:** Which type of datastore is best suited for implementing a text search view (e.g., finding keywords in orders)?
    **Answer:** A text search engine (e.g., Elasticsearch).

20. **Question:** Which type of datastore is recommended for fraud detection or social graph queries?
    **Answer:** A Graph database (e.g., Neo4j).

21. **Question:** If you need a simple lookup of JSON objects by ID, which database types are recommended?
    **Answer:** Document stores (e.g., MongoDB, DynamoDB) or Key-value stores (e.g., Redis).

22. **Question:** Can a CQRS View use a standard SQL RDBMS?
    **Answer:** Yes, it is suitable for standard reporting and business intelligence.

### **Topic: CQRS Challenges & Advanced Implementation**

23. **Question:** What is "Replication Lag" in the context of CQRS?
    **Answer:** The time delay between the Command side publishing an event and the Query side updating the view.

24. **Question:** How can a client detect if the View is out-of-date due to replication lag?
    **Answer:** The client receives a version token (containing the Event ID) from the command side and passes it to the query side to check currency.

25. **Question:** What is the "Optimistic" solution for handling replication lag in the UI?
    **Answer:** The UI updates its local model immediately after a successful command without waiting for a query response.

26. **Question:** Why must CQRS event handlers be designed to be **idempotent**?
    **Answer:** Because message brokers may deliver the same event message more than once.

27. **Question:** How does a non-idempotent event handler detect duplicate events?
    **Answer:** By recording the IDs of processed events in the view database and checking new events against this record.

28. **Question:** How should the Data Access Object (DAO) handle concurrent updates (multiple events arriving at once)?
    **Answer:** By using pessimistic or optimistic locking to ensure one update doesn't overwrite another.

29. **Question:** If you need to change the schema of a View Database, what must you often do?
    **Answer:** Rebuild the view from scratch by replaying all historical events.

30. **Question:** Between API Composition and CQRS, which pattern has higher infrastructure and development complexity?
    **Answer:** CQRS.
