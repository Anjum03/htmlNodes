
require('dotenv').config();


const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

const register = async (req,res)=>{
      console.log(req.body);
  //lastname email phoneno msgbox phoneapp feature timeline numberscren
  const firstName = req.body.firstName;
  const lastName  = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const message = req.body.message;
  const password = req.body.password;

    let config = {
        service: 'gmail',
        auth: {
          user: process.env.USERSEMAIL,
          pass: process.env.USERPASSWORD
        }
      }
      let transporter = nodemailer.createTransport(config);

      let mailGenerator = new mailgen({
        theme: "default",
        product: {
          name: 'My App',
          link: 'https://myapp.com/'
        }
        
      });
      const emailBody = {
    body: {
      name:req.body.firstName, intro: "Email Successfully",
      table:{
        data:[
          {
            firstName: firstName,
            lastName:lastName,
            email: email,
            mobile: mobile,
            message:message,
            password: password
          }
        ]
      },
      outro: "Looking forward to do more business"
    }
  };
      const emailTemplate = mailGenerator.generate( emailBody);
      const emailText = mailGenerator.generatePlaintext(emailBody);
      let msg ={
        from : req.body.email,     //from email (client email)
        to : process.env.USERSEMAIL ,   //qamar sir(company email)
        subject: "Email Sent Successfully",
        text: emailText,
        html: emailTemplate
      }
      transporter.sendMail(msg).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

}



module.exports = register
