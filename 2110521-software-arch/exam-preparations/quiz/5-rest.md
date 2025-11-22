### Section 1: REST Architecture & Standards

1.  **Question:** What does the acronym REST stand for?
    **Answer:** Representational State Transfer.

2.  **Question:** In the Client-Server architecture, which protocol is used for communication between the two?
    **Answer:** HTTP (HyperText Transfer Protocol).

3.  **Question:** Which HTTP request method is used to **retrieve** a resource?
    **Answer:** GET.

4.  **Question:** Which HTTP request method is typically used to **submit** or **create** a new resource?
    **Answer:** POST.

5.  **Question:** What is the difference between PUT and PATCH?
    **Answer:** PUT updates/replaces the entire resource, while PATCH updates only specific fields of the resource.

6.  **Question:** According to RESTful standards, is the endpoint `/getUsers` correct? Why or why not?
    **Answer:** No, it is incorrect. Endpoints should use nouns (e.g., `/users`), not verbs.

7.  **Question:** Which HTTP status code represents a generic "Success"?
    **Answer:** 200.

8.  **Question:** Which HTTP status code is returned when a resource is successfully **created**?
    **Answer:** 201.

9.  **Question:** Which HTTP status code represents "Unauthorized" (Client Error)?
    **Answer:** 401.

10. **Question:** Which HTTP status code represents "Not Found"?
    **Answer:** 404.

11. **Question:** If the server crashes or fails to process a valid request, which status code range is returned?
    **Answer:** 500–599 (specifically 500 Internal Server Error).

### Section 2: Implementation (Node.js, Express, Mongoose)

12. **Question:** What is the specific command used to generate a `package.json` file?
    **Answer:** `npm init`.

13. **Question:** What is the purpose of the `nodemon` library installed as a dev dependency?
    **Answer:** It automatically restarts the server whenever code changes are saved.

14. **Question:** Which library is used in the project to interact with the MongoDB database?
    **Answer:** Mongoose.

15. **Question:** In the Mongoose schema code `default: Date.now`, what does this line do?
    **Answer:** It automatically sets the current date and time if the user does not provide one.

16. **Question:** In an Express route, how do you access a URL parameter like `:id`?
    **Answer:** `req.params.id`

17. **Question:** In an Express route (specifically POST or PATCH), how do you access the JSON data sent by the client?
    **Answer:** `req.body`

18. **Question:** What is the purpose of the `dotenv` library?
    **Answer:** To load environment variables (like database passwords) from a `.env` file so they aren't hardcoded in the source code.

19. **Question:** In the sample code's `delete` route, what does `res.subscriber.remove()` do?
    **Answer:** It deletes the specific subscriber found by the middleware from the database.

### Section 3: API Security

20. **Question:** Which specific attack involves injecting malicious MongoDB operators (like `$gt`) into login fields?
    **Answer:** NoSQL Injection.

21. **Question:** Which library was installed to prevent NoSQL Injection by sanitizing data?
    **Answer:** `express-mongo-sanitize`.

22. **Question:** What does the **Helmet** library do for an API?
    **Answer:** It sets various HTTP headers to secure the app (hiding server tech, preventing sniffing, etc.).

23. **Question:** What does **XSS** stand for?
    **Answer:** Cross-Site Scripting.

24. **Question:** Which library is used to convert HTML tags (like `<script>`) into safe text to prevent XSS attacks?
    **Answer:** `xss-clean`.

25. **Question:** What is the purpose of **Rate Limiting**?
    **Answer:** To prevent Denial of Service (DoS/DDoS) or spam attacks by limiting the number of requests an IP can make in a certain time frame.

26. **Question:** What is **HPP** (HTTP Parameter Pollution)?
    **Answer:** An attack where a hacker sends multiple parameters with the same name to confuse the server.

27. **Question:** What is **CORS** and why might you need to enable it?
    **Answer:** Cross-Origin Resource Sharing. It allows a frontend on one domain (e.g., localhost:3000) to request data from an API on a different domain (e.g., localhost:5000).

### Section 4: Documentation & Client

28. **Question:** What is the difference between OpenAPI and Swagger?
    **Answer:** OpenAPI is the **specification** (the standard), while Swagger refers to the **tools** (like Swagger UI) used to implement it.

29. **Question:** In the client-side sample code, which library acts as the "browser" to send HTTP requests to the API?
    **Answer:** `unirest`.

30. **Question:** What template engine was used in the client code to render HTML views dynamically?
    **Answer:** Handlebars (`express-handlebars` or `.hbs`).
