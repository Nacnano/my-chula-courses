const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const connectDB = require("./config/mongodb");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Route files
const auth = require("./routes/auth");
const albums = require("./routes/albums");
const appointments = require("./routes/appointments");
const hospitals = require("./routes/hospitals");

//Load env vars
//Connect to DB
connectDB();

const app = express();

// 1) Body parser FIRST
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// 2) NoSQL injection sanitizer
app.use(mongoSanitize());

// 3) Security headers
app.use(helmet());

// 4) XSS sanitizer
app.use(xss());

// 5) Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 1000, // Set to 1 for testing rate limit
// });
// app.use(limiter);

// 6) Prevent HTTP Parameter Pollution
app.use(hpp());

// 7) CORS
app.use(cors());

// --- Swagger (OpenAPI) setup ---
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hospital API",
      version: "1.0.0",
      description: "API for hospitals (demo)",
    },
    servers: [{ url: "http://localhost:5000/api/v1" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/albums", albums);
app.use("/api/v1/appointments", appointments);
app.use("/api/v1/hospitals", hospitals);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

//Handler unhandled promise rejections
process.on("unhandleRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
