
require('dotenv').config();


const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

const register = async (req,res)=>{
    // const { userEmail } = req.body;
    console.log(req.body);

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
        //   name: req.body.name,                   //name
        //   email: req.body.email,                 //email
        //   password: req.body.password,                    //password
          intro: "Client Query!",
          
          outro: "Please check and reply"
        }
      };
      const emailTemplate = mailGenerator.generate( emailBody);
      const emailText = mailGenerator.generatePlaintext(emailBody);
      let msg ={
        from : req.body.email,     //from email (client email)
        to : process.env.USERSEMAIL ,   //qamar sir(company email)
        subject: "Place Order",
        html:emailText
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
