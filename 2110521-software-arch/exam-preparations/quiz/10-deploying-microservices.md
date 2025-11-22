### **Part 1: Deployment Patterns & Evolution**

1.  **Question:** Deployment consists of which two interrelated concepts?
    **Answer:** Process (steps performed by people) and Architecture (structure of the environment).

2.  **Question:** In the evolution of deployment, what major shift occurred regarding the lifespan of infrastructure?
    **Answer:** It moved from long-lived, permanent physical machines to ephemeral (short-lived) technologies like containers and serverless.

3.  **Question:** What is the primary benefit of the **Language-specific packaging** pattern (e.g., JAR/WAR files)?
    **Answer:** Fast deployment and efficient resource utilization (no overhead from extra OS layers).

4.  **Question:** What is a major drawback of the **Language-specific packaging** pattern regarding dependencies?
    **Answer:** Lack of encapsulation (dependency conflicts) and lack of isolation (one service can consume all resources).

5.  **Question:** In the **Service as a VM** pattern, what serves as the deployment unit?
    **Answer:** A Virtual Machine Image (e.g., Amazon Machine Image - AMI).

6.  **Question:** What is the main trade-off (drawback) of using **VMs** compared to Containers?
    **Answer:** They are heavyweight (each has a full OS), slower to deploy/boot, and have lower resource efficiency.

7.  **Question:** In the **Service as a Container** pattern, what do multiple containers running on the same machine share?
    **Answer:** The Operating System (OS) kernel.

8.  **Question:** Why is the **Container** pattern considered more lightweight than the VM pattern?
    **Answer:** Containers do not require a full OS for every instance; they run as isolated processes in a sandbox.

### **Part 2: Kubernetes (Orchestration)**

9.  **Question:** What is the primary definition of Kubernetes?
    **Answer:** A Docker orchestration framework (software that manages a pool of resources for running services).

10. **Question:** What are the three main functions of a Docker orchestration framework?
    **Answer:** Resource management, Scheduling, and Service management.

11. **Question:** In Kubernetes Architecture, which component acts as the "brain" providing the REST API for all commands?
    **Answer:** The API Server.

12. **Question:** What is the role of **Etcd** in Kubernetes?
    **Answer:** It is a key-value NoSQL database that stores the cluster's state and configuration.

13. **Question:** Which Kubernetes component runs on the **Node** (worker machine) and creates/manages the pods?
    **Answer:** Kubelet.

14. **Question:** What is the role of **Kube-proxy**?
    **Answer:** It manages networking and load balancing across pods.

15. **Question:** What is a **Pod** in Kubernetes?
    **Answer:** The basic unit of deployment; a wrapper that holds the application container(s).

16. **Question:** What is the role of the **Scheduler** in the Kubernetes master?
    **Answer:** It selects which specific node (machine) should run a newly created pod.

### **Part 3: Service Mesh & Istio**

17. **Question:** How does a Service Mesh allow you to separate **Deployment** from **Release**?
    **Answer:** It allows you to deploy code to production but control/restrict the traffic reaching it (e.g., routing 0% of users to the new version initially).

18. **Question:** What is the definition of a **Service Mesh**?
    **Answer:** A networking infrastructure that mediates all communication between services.

19. **Question:** What are the four main feature categories of Istio?
    **Answer:** Traffic management, Security, Telemetry, and Policy enforcement.

20. **Question:** In Istio's architecture, what component constitutes the **Data Plane**?
    **Answer:** Envoy Proxies (deployed as sidecars next to each service).

21. **Question:** What is the responsibility of the **Pilot** component in the Istio Control Plane?
    **Answer:** It extracts deployment information and configures the Envoy proxies to route traffic.

22. **Question:** What is the responsibility of the **Mixer** component in the Istio Control Plane?
    **Answer:** It collects telemetry (metrics) and enforces policies (quotas/limits).

### **Part 4: Serverless (AWS Lambda)**

23. **Question:** What does the Amazon term "Undifferentiated Heavy Lifting" refer to?
    **Answer:** The manual work of provisioning and managing servers/infrastructure that adds no unique business value.

24. **Question:** How does the pricing model for Serverless (AWS Lambda) differ from VMs?
    **Answer:** You are billed based on usage (requests/time/memory) rather than paying for reserved capacity/uptime.

25. **Question:** What is the main architectural limitation of AWS Lambda regarding the types of tasks it can run?
    **Answer:** It is designed for event-driven/short-lived requests, not long-running background services.

26. **Question:** What is "Long-tail latency" (or Cold Start) in Serverless?
    **Answer:** The delay caused when the cloud provider has to provision/spin up a new instance of the code because it hasn't been used recently.

27. **Question:** Which deployment pattern eliminates the need to administer operating systems entirely?
    **Answer:** Serverless (e.g., AWS Lambda).

### **Part 5: Summary & Comparisons**

28. **Question:** According to the summary slides, what is the recommended order for evaluating deployment options (from first choice to last)?
    **Answer:** 1. Serverless → 2. Containers → 3. Virtual Machines → 4. Language-specific packages.

29. **Question:** If an application requires highly **predictable latency** (cannot tolerate cold starts), which pattern is preferred over Serverless?
    **Answer:** Docker Containers (or Virtual Machines).

30. **Question:** Which pattern provides **Automatic Elasticity** (scaling) out of the box without needing configuration of auto-scaling groups?
    **Answer:** Serverless deployment.
