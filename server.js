/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
let multer = require('multer');
let upload = multer();

const connectDb = require("./config/connectDb");
const router = require("./routers/router");

const port = process.env.PORT || 3300;

app.use(cors( ))
connectDb();
// for parsing application/json
app.use(bodyParser.json()); 
app.use('/images' ,express.static('assets'))

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: "oke"
  });
});


app.listen(port, () => console.log(`this app running on port ${port}`));