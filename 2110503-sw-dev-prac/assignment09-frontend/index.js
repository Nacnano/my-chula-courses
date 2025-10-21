const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(express.json());
const albums = require("./routes/albums");
app.use("/albums", albums);
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
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`);
  server.close(() => process.exit(1));
});
