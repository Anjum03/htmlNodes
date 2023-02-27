require("dotenv").config();
// const app = require("express")();
const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;
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
// app.post('/register', (req, res) => {
//   console.log(req.body);
// //   const name = req.body.name;
// //   const email = req.body.email;
// //   const password = req.body.password;

//   let config = {
//     service: 'gmail',
//     auth: {
//       user: process.env.USEREMAIL,
//       pass: process.env.USERPASSWORD
//     }
//   }
//   let transporter = nodemailer.createTransport(config);

//   let mailGenerator = new mailgen({
//     theme: "default",
//     product: {
//       name: 'My App',
//       link: 'https://myapp.com/'
//     }
    
//   });
 
//   const emailBody = {
//     body: {
//     //   name: req.body.name,                   //name
//     //   email: req.body.email,                 //email
//     //   password: req.body.password,                    //password
//       intro: "Client Query!",
      
//       outro: "Please check and reply"
//     }
//   };
//   const emailTemplate = mailGenerator.generate( emailBody);
//   const emailText = mailGenerator.generatePlaintext(emailBody);

//   let msg ={

//     from: req.body.email, // form email (client email)
//     to:process.env.USEREMAIL , //qamar sir(company email)
//     subject: 'New User Registration',
//     text: emailText,
//     html: emailTemplate

//   }
//   //send email
// //   transporter.sendMail({
// //     from: req.body.email, // form email (client email)
// //     to:process.env.USEREMAIL , //qamar sir(company email)
// //     subject: 'New User Registration',
// //     text: emailText,
// //     html: emailTemplate
// //   }, (error, info) => {
// //     if (error) {
// //       console.log(error);
// //     } else {
// //       console.log('Email sent: ' + info.response);
// //     }
// //   });
// // })


// transporter.sendMail(msg).then(()=>{
//     return res.status(201).json({
//         msg: "you should receive an email"
//     })
// }).catch(error => {
//     return res.status(500).json({ error })
// })


// })




app.listen(PORT, () => {
    console.log(`Server is Started on PORT ${PORT} .... :)`);
  });