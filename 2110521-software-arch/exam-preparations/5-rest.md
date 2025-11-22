# REST API Development Masterclass

**Instructor:** Asst. Prof. Dr. Nuengwong Tuaycharoen

## 1. Introduction to REST Architecture

### What is a REST API?

**REST** stands for **Re presentational State Transfer**. It is a set of architectural standards for designing web services. **API** stands for **Application Programming Interface**.

Think of a REST API as a **waiter in a restaurant**.

- **The Client (You):** You look at the menu and place an order (The Request).
- **The API (Waiter):** Takes your order to the kitchen.
- **The Server (Kitchen):** Prepares the food/data.
- **The API (Waiter):** Brings the food back to you (The Response).

### The Client-Server Architecture

The slides emphasize the separation between the **Client** (Frontend/User) and the **Server** (Backend/Database).

- **Communication:** They talk via **HTTP** (HyperText Transfer Protocol).
- **The Flow:**
  1.  Client sends an **HTTP Request** (often containing data in JSON format).
  2.  Server processes the request and talks to the database.
  3.  Server sends back an **HTTP Response** (usually JSON or HTML).

### HTTP Request Methods

These are the "verbs" used to tell the server what you want to do.

- **GET:** Retrieve data (e.g., "Give me the list of subscribers").
- **POST:** Submit/Create new data (e.g., "Add a new subscriber").
- **PUT/PATCH:** Update existing data (e.g., "Change this subscriber's name").
- **DELETE:** Remove data (e.g., "Delete this subscriber").

### RESTful API Naming Standards

URLs (endpoints) should be nouns, not verbs.

- **Correct:** `GET /resources` (Get all), `GET /resources/1` (Get ID 1).
- **Incorrect:** `GET /getResources`, `POST /addNewResource`.

### HTTP Status Codes

The server tells the client how the request went using a 3-digit code.

- **200-299 (Success):**
  - `200 OK`: Success.
  - `201 Created`: Success and something was created (common for POST).
- **300-399 (Redirects):**
  - `304 Not Modified`: Using cached data.
- **400-499 (Client Errors - You made a mistake):**
  - `400 Bad Request`: Invalid input.
  - `401 Unauthorized`: You need to log in.
  - `404 Not Found`: The resource doesn't exist.
- **500-599 (Server Errors - We made a mistake):**
  - `500 Internal Server Error`: The server crashed or failed.

---

## 2. Environment Setup

To build this project, the following tools and technologies are used:

### Essential Software

1.  **Node.js:** The runtime environment that allows JavaScript to run on the server (outside the browser).
2.  **VS Code (Visual Studio Code):** The code editor.

### VS Code Extensions (Recommended)

- **Rest Client:** Allows you to send HTTP requests (GET, POST, etc.) directly within VS Code to test your API without opening a browser or external tool.
- **Prettier:** Automatically formats code to make it neat.
- **Bracket Pair Colorizer:** Color-codes matching brackets `()` `{}` `[]` so you don't get lost in logic.
- **DotENV:** Highlights syntax for `.env` configuration files.

### Project Initialization

To start a project, run these commands in the terminal:

1.  `npm init`: Creates the `package.json` file (the ID card of your project).
2.  `npm install express dotenv mongoose`: Installs core libraries.
3.  `npm install -D nodemon`: Installs a tool that automatically restarts the server when you save code (Development dependency).

---

## 3. API Development Implementation

The guide builds a "Subscriber" system.

### Key Dependencies

- **Express:** A framework to build web servers easily in Node.js.
- **Mongoose:** A library to interact with MongoDB (the database).
- **Dotenv:** Loads secret variables (like database passwords) from a hidden file.

### 1. Database Connection (`server.js` & `config.env`)

- **Config:** Secrets like `DATABASE_URL` are stored in `config.env` so they aren't hardcoded.
- **Connection:** The server uses `mongoose.connect()` to link to the MongoDB Atlas (cloud database). Events like `.on('error')` and `.once('open')` are used to log connection status.

### 2. The Data Model (`models/subscriber.js`)

This defines what a "Subscriber" looks like in the database (the Schema).

- **name:** String, Required.
- **subscribedToChannel:** String, Required.
- **subscribeDate:** Date, defaults to the current time (`Date.now`).

### 3. The Routes (`routes/subscribers.js`)

This file handles the logic for different URLs.

- **Middleware (`getSubscriber` function):**

  - _Concept:_ A helper function used by GET (one), PATCH, and DELETE.
  - _Logic:_ It searches for a subscriber by ID. If found, it attaches the subscriber to the response object (`res.subscriber`). If not found, it sends a 404 error immediately. This prevents rewriting code 3 times.

- **CRUD Operations:**
  - **Get All (`/`):** Uses `Subscriber.find()` to return an array of all data.
  - **Get One (`/:id`):** Uses the middleware to return just one.
  - **Create (`/` POST):** Creates a `new Subscriber()`, saves it with `.save()`, and returns 201 status.
  - **Update (`/:id` PATCH):** Checks which fields are sent by the user (Name? Channel?), updates only those fields, and saves.
  - **Delete (`/:id` DELETE):** Removes the subscriber found by the middleware.

---

## 4. API Security

Security is critical to prevent hackers from crashing the server or stealing data.

### implemented Security Measures:

1.  **Sanitization (NoSQL Injection):**
    - _Threat:_ Hackers using special MongoDB commands (like `$gt` - greater than) in login fields to trick the database.
    - _Solution:_ `npm i express-mongo-sanitize`. This library removes keys starting with `$` to prevent injection.
2.  **Security Headers (Helmet):**
    - _Solution:_ `npm i helmet`. Automatically sets various HTTP headers to hide server details and protect against common web vulnerabilities.
3.  **XSS Protection (Cross-Site Scripting):**
    - _Threat:_ Hackers putting HTML scripts (e.g., `<script>alert(1)</script>`) into inputs like "Name". When displayed, this script runs on other users' computers.
    - _Solution:_ `npm i xss-clean`. It converts HTML tags into safe text so the script doesn't run.
4.  **Rate Limiting:**
    - _Threat:_ A user spamming the API with thousands of requests to crash it (DDoS).
    - _Solution:_ `npm i express-rate-limit`. Limits an IP address to X requests per Y minutes (e.g., 100 requests per 10 mins).
5.  **HPP (HTTP Parameter Pollution):**
    - _Threat:_ Sending multiple parameters with the same name to confuse the server.
    - _Solution:_ `npm i hpp`.
6.  **CORS (Cross-Origin Resource Sharing):**
    - _Concept:_ By default, browsers block Request A (site.com) from asking for data from Server B (api.com).
    - _Solution:_ `npm i cors`. Allows you to whitelist specific domains that _are_ allowed to talk to your API.

---

## 5. Documentation (OpenAPI & Swagger)

### What is OpenAPI?

A standard way to describe your API so both humans and computers understand it without looking at the code.

### What is Swagger?

A set of tools that use the OpenAPI specification to build beautiful, interactive documentation websites.

### Implementation

1.  Install `swagger-jsdoc` and `swagger-ui-express`.
2.  **Configuration:** Set up `swaggerOptions` in `server.js` (Title, Version).
3.  **Annotations:** Write special comments starting with `/** @swagger` above your routes.
    - Describe what the route does (e.g., `get: /books`).
    - Describe the expected response (e.g., `200: Success`).
4.  **Result:** Visiting `/api-docs` on your server renders a webpage where users can click "Try it out" to test the API.

---

## 6. Creating a Client

An API is useless if nothing consumes it. The slides show how to build a simple Node.js Web App client.

### Technologies

- **Unirest:** A lightweight library to make HTTP requests (Acting as the "browser" for the server).
- **Express-Handlebars (.hbs):** A template engine. It allows you to write HTML that can fill in variables (like a list of subscribers) dynamically.

### Workflow

1.  **Client Server (`client.js`):** Runs on port 3000.
2.  **User Action:** User visits `localhost:3000/sub`.
3.  **Data Fetch:** `client.js` uses **Unirest** to call the REST API (`localhost:5000/subscribers`).
4.  **Rendering:** The API returns JSON data. The client passes this data to `main.hbs`.
5.  **Display:** The Handlebars file loops through the data (`{{#each datafromserver}}`) and creates an HTML table.

---

## 7. Assignment: Restaurant Member System

**Objective:** Re-create a REST API based on the "Subscriber" sample code, but adapted for a Restaurant Member System.

### Requirements:

1.  **Database:** Create your own MongoDB database (Do not use the instructor's).
2.  **Data Model (Member):** Must include:
    - Name
    - Address
    - Telephone Number
    - E-mail Address
    - Member Start Date
3.  **Functionality:** Implement full CRUD (Create, Read, Update, Delete) using GET, POST, PUT, and DELETE methods.
4.  **Evidence:**
    - Create a `route.rest` file demonstrating all API calls working.
    - Record a video clip (< 5 minutes, MP4) showing the demonstration.
5.  **Submission:** Submit the video to MCV.
