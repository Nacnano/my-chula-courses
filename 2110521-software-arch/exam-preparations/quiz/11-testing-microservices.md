### **Section 1: General Testing Concepts & The Pyramid**

1.  **Why is manual testing considered inefficient in a microservices environment?**

    - **Answer:** It is slow, prone to human error, and usually happens too late in the delivery process to catch bugs effectively.

2.  **What is the "System Under Test" (SUT)?**

    - **Answer:** The specific element being verified by a test, which can range from a single class to a full application.

3.  **According to the Test Pyramid, which type of test should you have the most of, and why?**

    - **Answer:** Unit tests. They should be the most numerous because they are fast, reliable, and cheap to run.

4.  **As you move _up_ the Test Pyramid, what happens to the execution time and cost of the tests?**

    - **Answer:** Tests become slower, more brittle (easier to break), and more costly to maintain.

5.  **What are the four phases of a typical automated test?**

    - **Answer:** Setup, Exercise (Execute), Verify, and Teardown.

6.  **In Brian Marick’s test quadrant, what are the two dimensions used to categorize tests?**
    - **Answer:** Business-facing vs. Technology-facing, and Supporting Programming vs. Critiquing the Application.

---

### **Section 2: Unit Testing (Solitary vs. Sociable)**

7.  **What is the main difference between a Mock and a Stub?**

    - **Answer:** A **Stub** provides canned answers (returns values) to the SUT to allow the test to run. A **Mock** is used to verify _behavior_ (checking if the SUT called a specific method on the dependency).

8.  **What is a "Solitary" unit test?**

    - **Answer:** A test that verifies a class in total isolation by replacing all its collaborators/dependencies with test doubles (mocks/stubs).

9.  **What is a "Sociable" unit test?**

    - **Answer:** A test that verifies a class along with its real dependencies (collaborators).

10. **Should a "Domain Entity" (like an Order object) be tested using Solitary or Sociable unit tests?**

    - **Answer:** Sociable unit tests (because entities typically have state and behavior that don't rely on external infrastructure).

11. **Should a "Service" class (like OrderService) or a "Controller" be tested using Solitary or Sociable unit tests?**

    - **Answer:** Solitary unit tests (because they often rely on complex external dependencies that should be mocked out).

12. **What is the purpose of the "Teardown" phase in a test?**
    - **Answer:** To clean up the test fixture or environment (e.g., rolling back a database transaction) so subsequent tests are not affected.

---

### **Section 3: Integration & Contract Testing**

13. **What is the primary challenge of testing microservices compared to monoliths?**

    - **Answer:** Interprocess communication; ensuring different services communicate correctly over the network.

14. **What is "Consumer-Driven Contract Testing"?**

    - **Answer:** A testing strategy where the Consumer (client) defines the API expectations (the contract), and the Provider (service) ensures it adheres to them.

15. **In the context of Contract Testing, what does the "Provider" do?**

    - **Answer:** The Provider runs tests to verify that their API implementation matches the "shape" and behavior defined in the contract.

16. **In the context of Contract Testing, what does the "Consumer" use to run their tests?**

    - **Answer:** The Consumer uses a Stub (often generated from the contract) to simulate the Provider's response without calling the real service.

17. **What specific logic do Integration Tests target?**

    - **Answer:** They verify that the service can interact correctly with infrastructure services (like databases) or other application services.

18. **When testing a "Persistence" layer (Database Integration Test), what is a common way to handle the "Teardown" phase?**
    - **Answer:** Rolling back the transaction initiated during the setup phase to leave the database clean.

---

### **Section 4: Component Testing**

19. **How does a Component Test view the service?**

    - **Answer:** As a "Black Box." It tests the service through its external API without accessing internal classes.

20. **In a Component Test, how are external dependencies (like other microservices) handled?**

    - **Answer:** They are replaced with Stubs (simulated services) to isolate the service being tested.

21. **What is Gherkin?**

    - **Answer:** A domain-specific language (DSL) that uses English-like syntax (Given, When, Then) to write executable specifications/acceptance tests.

22. **Which tool is commonly used to execute Gherkin specifications?**

    - **Answer:** Cucumber.

23. **In a Gherkin scenario, what does the keyword "Given" correspond to in the standard test phases?**

    - **Answer:** The Setup phase.

24. **In a Gherkin scenario, what does the keyword "Then" correspond to?**
    - **Answer:** The Verification phase.

---

### **Section 5: End-to-End (E2E) Testing & Pipeline**

25. **What is the scope of an End-to-End (E2E) test?**

    - **Answer:** It tests the entire application, including all microservices and real infrastructure, from the user's perspective.

26. **Why should you minimize the number of End-to-End tests?**

    - **Answer:** Because they are slow, brittle (break easily), difficult to debug, and expensive to maintain.

27. **What is a "User Journey" test?**

    - **Answer:** A type of E2E test that simulates a user's path through the application to verify high-level behavior of a large slice of functionality.

28. **What is the "Deployment Pipeline"?**

    - **Answer:** The automated process (Continuous Delivery) that takes code from the developer’s machine, runs tests, and deploys it to production.

29. **Which testing stage typically happens _before_ the code is committed to the shared repository?**

    - **Answer:** Pre-commit tests (usually Unit Tests run locally).

30. **When testing an asynchronous "Publish/Subscribe" interaction, what are you verifying?**
    - **Answer:** That the publisher sends a message matching the contract schema, and the subscriber can correctly consume that message.
