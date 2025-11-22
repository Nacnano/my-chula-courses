# gRPC with Node.js: Comprehensive Documentation

## 1. Introduction to gRPC

**gRPC** (gRPC Remote Procedure Calls) is a modern, open-source remote procedure call (RPC) framework that allows applications to communicate transparently across different environments. It was developed by Google and is used by major companies like Netflix, Square, and Docker.

### Key Concepts & Terminology

- **RPC (Remote Procedure Call):** A protocol that allows a program to execute a function (procedure) on a different computer (server) as if it were a local function call.
- **Stub:** A piece of code on the **client-side** that mimics the methods available on the server. When the client calls a method on the stub, it handles the communication to the actual server.
- **Language Agnostic:** gRPC works across many languages. A server written in C++ can easily talk to a client written in Node.js, Java, or Python.
- **Serialization:** The process of converting data objects into a byte stream for transmission. gRPC uses **Protocol Buffers** for this, which is faster and smaller than JSON/XML.

---

## 2. Protocol Buffers (Protobuf)

gRPC uses a special file format called **Protocol Buffers** (`.proto`) as its **IDL (Interface Definition Language)**. This file defines the structure of the data and the methods the service offers.

### The `.proto` File Structure

A `.proto` file serves as a contract between the client and the server.

**1. Messages:**
Data structures are defined as `messages`. Each field in a message has a type, a name, and a **unique tag number**.

```protobuf
message Person {
  string name = 1;  // Tag number 1
  int32 id = 2;     // Tag number 2
  bool has_ponycopter = 3; // Tag number 3
}
```

- **Tag Numbers (e.g., `= 1`):** These are used in the binary encoding. They identify fields in the serialized data, making the data much smaller than JSON (which sends field names repeatedly).
- **Rules:**
  - `required`: The field must be present (Legacy).
  - `optional`: The field may or may not be present.
  - `repeated`: An array/list of values.

**2. Services:**
Services define the methods that can be called remotely.

```protobuf
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloResponse) {}
}
```

---

## 3. The 4 Types of gRPC Service Methods

gRPC supports four specific modes of communication, allowing for versatile data transfer.

| #     | Type                        | Description                                                                        | Client Sends   | Server Returns | Use Case                                  |
| :---- | :-------------------------- | :--------------------------------------------------------------------------------- | :------------- | :------------- | :---------------------------------------- |
| **1** | **Unary RPC**               | Traditional request/response.                                                      | Single Message | Single Message | Simple API calls (e.g., Get User by ID).  |
| **2** | **Server Streaming**        | Client sends one request; Server sends back a stream of data.                      | Single Message | **Stream**     | Video streaming, live feeds, stock ticks. |
| **3** | **Client Streaming**        | Client uploads a stream of data; Server waits until finished to send one response. | **Stream**     | Single Message | Uploading large files, IoT sensor data.   |
| **4** | **Bidirectional Streaming** | Both sides send a stream of messages independently. Read/Write order is flexible.  | **Stream**     | **Stream**     | Chat applications, real-time gaming.      |

---

## 4. Setting Up a gRPC Project in Node.js

To build a gRPC application in Node.js, you need specific libraries to load the `.proto` files and manage connections.

### Dependencies

- `@grpc/grpc-js`: The pure JavaScript implementation of the gRPC core.
- `@grpc/proto-loader`: A utility to load `.proto` files into Node.js dynamically.

### Loading the Proto File (Code Example)

This code reads the `.proto` file and prepares it for use in the application.

```javascript
const PROTO_PATH = __dirname + "/route_guide.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the file with specific configuration options
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, // Preserve variable casing
  longs: String, // Represent long numbers as Strings
  enums: String, // Represent enums as Strings
  defaults: true, // Use default values for missing fields
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const routeguide = protoDescriptor.routeguide; // Access the package
```

---

## 5. Implementing the Server

The server implements the logic defined in the `.proto` file.

### 1. Creating the Server

```javascript
function getServer() {
  var server = new grpc.Server();
  // Map the proto definition to the actual JavaScript functions
  server.addService(routeguide.RouteGuide.service, {
    getFeature: getFeature, // Unary
    listFeatures: listFeatures, // Server Streaming
    recordRoute: recordRoute, // Client Streaming
    routeChat: routeChat, // Bidirectional
  });
  return server;
}
```

### 2. Implementing Method Logic

- **Unary (GetFeature):** Uses a `callback` to send the response.
  - `call.request`: Access incoming data.
  - `callback(null, response)`: Send data back.
- **Server Streaming (ListFeatures):** Uses `call.write()` to send multiple items.
  - `call.write(feature)`: Sends a chunk of data.
  - `call.end()`: Closes the stream.
- **Client Streaming (RecordRoute):** Uses Event Emitters.
  - `call.on('data', ...)`: Triggers every time the client sends a chunk.
  - `call.on('end', ...)`: Triggers when the client stops sending. Here, you send the final `callback`.
- **Bidirectional (RouteChat):** Uses both writing and event listeners.
  - `call.on('data')`: Read incoming.
  - `call.write()`: Send outgoing.

### 3. Starting the Server

```javascript
var routeServer = getServer();
routeServer.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    routeServer.start();
  }
);
```

---

## 6. Implementing the Client

The client uses a **Stub** to communicate with the server.

### Creating the Client Stub

```javascript
var client = new routeguide.RouteGuide(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
```

### Calling Methods

- **Unary:** `client.getFeature(requestObject, callbackFunction)`
- **Streaming:**
  ```javascript
  var call = client.listFeatures(rectangle);
  call.on("data", function (feature) {
    // Handle incoming stream data
  });
  call.on("end", function () {
    // Stream finished
  });
  ```

---

## 7. Project Walkthrough: Restaurant CRUD API

The slides introduce a practical full-stack architecture combining a Web Browser, Express.js (REST API), and gRPC.

### The Architecture

1.  **Web Client (Browser):** User interacts with HTML/Handlebars UI.
2.  **REST API Server (Node/Express):** Receives HTTP requests (`GET`, `POST`) from the browser. It acts as the **gRPC Client**.
3.  **gRPC Server:** Receives calls from Express. It performs the actual logic (CRUD operations on the menu data).
4.  **Backend/Database:** Where the data is actually stored.

### Step-by-Step Implementation

#### A. The Proto File (`restaurant.proto`)

Defines the `RestaurantService` with methods:

- `GetAllMenu(Empty)` returns `MenuList`
- `Get(MenuId)` returns `MenuItem`
- `Insert(MenuItem)` returns `MenuItem`
- `Update(MenuItem)` returns `MenuItem`
- `Remove(MenuId)` returns `Empty`

#### B. The Server (`server.js`)

- Currently uses an in-memory array (`const menu = [...]`) as a database.
- Uses `uuid` to generate unique IDs for new menu items.
- Implements standard Javascript Array methods (`find`, `push`, `splice`, `findIndex`) to manipulate data.
- **Error Handling:** Returns `grpc.status.NOT_FOUND` if an item ID doesn't exist.

#### C. The Express Client (`index.js`)

- Sets up an Express app with Handlebars (`hbs`) for views.
- **Routes:**
  - `GET /`: Calls `client.getAllMenu`. Renders the `menu.hbs` view.
  - `POST /save`: Calls `client.insert`. Redirects home.
  - `POST /update`: Calls `client.update`. Redirects home.
  - `POST /remove`: Calls `client.remove`. Redirects home.

#### D. The Frontend (`menu.hbs`)

- Uses Bootstrap for styling.
- Displays a table of menu items.
- Uses Modals (pop-ups) for "Add New", "Edit", and "Remove" actions.
- Uses jQuery to pass data (ID, Name, Price) from the table into the Modal forms before submission.

---

## 8. Running the Application

To run the full stack example:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start the gRPC Server:**
    ```bash
    node server/server.js
    ```
    _(Running on port 30043)_
3.  **Start the Express Client (in a new terminal):**
    ```bash
    node index.js
    ```
    _(Running on port 3000)_
4.  **Access:** Open a browser to `localhost:3000`.

---

## 9. Assignment: Connect to MongoDB

The current application stores data in a temporary variable (RAM). The goal is to make the data persistent using a database.

### Tasks:

1.  **Create a Model:** Create `models/Menu.js` using **Mongoose**. Define a Schema with `name` (String) and `price` (Number).
2.  **Update `server.js`:**
    - Import `mongoose`.
    - Connect to a MongoDB cluster (e.g., MongoDB Atlas).
    - **Replace Array Logic:** Instead of `menu.push` or `menu.find`, use Mongoose methods like:
      - `Menu.find()`
      - `Menu.create()`
      - `Menu.findByIdAndUpdate()`
      - `Menu.deleteOne()`
    - **Async/Await:** Ensure you handle the asynchronous nature of database calls properly inside the gRPC methods.
3.  **Deliverable:** Record a <5 minute video demonstrating the CRUD operations working with the MongoDB database connected.
