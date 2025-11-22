### Section 1: Concepts & Fundamentals

**1. What is the main serialization mechanism (IDL) used by gRPC?**
**Answer:** Protocol Buffers (Protobuf).

**2. What is the specific name of the client-side object that provides the same methods as the server?**
**Answer:** The Stub.

**3. According to the slides, gRPC guarantees the order of what?**
**Answer:** Messages.

**4. What are the four defined types of gRPC service methods?**
**Answer:** Unary, Server Streaming, Client Streaming, Bidirectional Streaming.

**5. In the slide architecture, how does the "JavaScript Web App" communicate with the "REST API Server"?**
**Answer:** Via HTTP.

**6. In the slide architecture, how does the "REST API Server" communicate with the "Backend"?**
**Answer:** Via gRPC.

**7. What major benefit does using tag numbers (e.g., `name = 1`) in Protocol Buffers provide over JSON?**
**Answer:** Smaller message size (it doesn't send field names, only binary tags).

### Section 2: Protocol Buffers (.proto)

**8. What is the specific syntax line required at the top of a `.proto` file?**
**Answer:** `syntax = "proto3";`

**9. Which keyword is used in a `.proto` file to define an array or a list of values?**
**Answer:** `repeated`.

**10. In a `.proto` message definition, what must be unique for every field?**
**Answer:** The tag number (e.g., `= 1`, `= 2`).

**11. Which range of tag numbers is reserved for Protocol Buffers implementation and cannot be used?**
**Answer:** 19000 through 19999.

**12. If you want to define a function that accepts a stream of data in a `.proto` file, where do you place the `stream` keyword?**
**Answer:** Inside the parentheses, before the message type (e.g., `stream Point`).

### Section 3: gRPC Service Types (The 4 Kinds)

**13. Which gRPC method type sends a Single Request and receives a Single Response?**
**Answer:** Unary RPC.

**14. Which gRPC method type involves the client sending a Single Request and the server returning a Stream of messages?**
**Answer:** Server Streaming RPC.

**15. Which gRPC method type involves the client sending a Stream of messages and the server returning a Single Response?**
**Answer:** Client Streaming RPC.

**16. In a Bidirectional Streaming RPC, are the read and write streams independent or locked?**
**Answer:** Independent (they can read and write in any order).

### Section 4: Node.js Implementation & Syntax

**17. Which Node.js package is used to dynamically load `.proto` files?**
**Answer:** `@grpc/proto-loader`.

**18. In `protoLoader.loadSync`, why is the option `longs: String` used?**
**Answer:** To ensure large numbers are treated as Strings (to avoid precision loss in JavaScript).

**19. What function is used in the server code to assign a port and start listening for requests?**
**Answer:** `server.bindAsync()` (followed by `server.start()`).

**20. In a Unary RPC implementation on the server, what two arguments are passed to the function?**
**Answer:** `call` and `callback`.

**21. How does a Server Streaming function send an individual chunk of data to the client?**
**Answer:** Using `call.write(data)`.

**22. How does a server indicate it has finished sending data in a Server Streaming RPC?**
**Answer:** Using `call.end()`.

**23. In a Client Streaming RPC, which event listener handles the incoming chunks of data?**
**Answer:** `call.on('data', ...)`

**24. In the provided code, what method is used to create an insecure connection on the client side?**
**Answer:** `grpc.credentials.createInsecure()`.

### Section 5: The "Restaurant" Sample Project & Assignment

**25. In the sample project `server.js`, what was used as a temporary database before MongoDB was implemented?**
**Answer:** An in-memory JavaScript Array (`const menu = [...]`).

**26. Which library was imported to generate unique IDs for new menu items?**
**Answer:** `uuid` (specifically `uuidv4`).

**27. In the Express client (`index.js`), which template engine was used to render the views?**
**Answer:** Handlebars (`hbs`).

**28. In the final assignment, which library are you required to use to connect to the MongoDB database?**
**Answer:** Mongoose.

**29. When connecting the gRPC server to MongoDB, what JavaScript keywords must be added to handle database latency?**
**Answer:** `async` and `await`.

**30. In the `server.js` error handling, what gRPC status code is sent if an item is not found?**
**Answer:** `grpc.status.NOT_FOUND`.
