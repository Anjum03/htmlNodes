
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
  const inlineRadio = req.body.inlineRadio;
  const number_screen = req.body.number_screen;
  const timeline = req.body.timeline;
  const checkbox_feature = req.body.checkbox_feature
  const checkbox_language = req.body.checkbox_language

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
          name: 'Namlsoft',
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
            inlineRadio: inlineRadio,
            number_screen: number_screen,
            timeline:timeline,
            checkbox_feature:checkbox_feature,
            checkbox_language:checkbox_language
            
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
        res.status(200).send("Email sent Successfully");
        return res.status(201).json({
          msg: "Email sent successfully"
          
        })
      }).catch(error => {
      res.status(500).send("Email not sent Successfully");
        return res.status(500).json({ error })
    })

}



module.exports = register
