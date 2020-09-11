/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const connectDb = require("./config/connectDb");
const router = require("./routers/router");

const port = process.env.PORT || 3300;

connectDb();
app.use(bodyParser());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: "oke"
  });
});


app.listen(port, () => console.log(`this app running on port ${port}`));