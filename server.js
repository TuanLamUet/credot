/** @format */

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/connectDb");
const authRouter = require("./routers/authRouter");
const app = express();

const port = process.env.PORT || 3300;

connectDb();
app.use(bodyParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "oke" });
});

app.use("/api", authRouter);

app.listen(port, () => console.log(`this app running on port ${port}`));
