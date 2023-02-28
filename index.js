require("dotenv").config();
// const app = require("express")();
const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using cors
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const allowlist = ['http://example1.com', 'http://example2.com'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};


const useRoute = require("./route/userRoute");
app.use('/user', useRoute);


const nodemailer = require("nodemailer")
const mailgen = require('mailgen');



app.listen(PORT, () => {
    console.log(`Server is Started on PORT ${PORT} .... :)`);
  });