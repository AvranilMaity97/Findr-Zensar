const express = require("express");
const app = express();
const users = require("./routes/users");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.use(cors());
app.use("/api/v1/users", users);
app.use(errorHandlerMiddleware);

// port and server setup
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
