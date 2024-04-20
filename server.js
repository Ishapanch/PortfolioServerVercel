// Install dependencies
// express – handles the route used by the POST request.
// cors – allows for cross origin resource sharing between the frontend and the server.
// nodemailer – simplifies sending emails with Node.js using SMTP.
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");


// Next we use express() to setup the server that’ll run on port 5000:
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));


// You just need to add you username and password here to setup Nodemailer with Gmail: (Google acc ==> security ==>2 step auth ==>app pass at bttm ==> create app pass)
// Use the gamil ID and the pass generated by the app password in google settings manager
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "inp2202@gmail.com",
      pass: "llyr qnvw amig daai",//pwd genereated using app passwords in google accc manager
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });


//   we just need to setup the router and send the email:
  router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;// const called from frontend using email: email.value,
    const message = req.body.message; 
    const options = req.body.options; 
    const services = req.body.services; 
    const mail = { // mail text  code using html mail to adin
      from: email,
      to: "isha220102@gmail.com",
      subject: "Portfolio Contact Form Submission",
      html: `<p>Mail Details From New Client </p>
            <p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Radio Button: ${options}</p>
             <p>Services: ${services}</p>
             <p>Message: ${message}</p>`,
    };
    const mailclient = { // mail text  code using html mail to client
        from: "isha220102@gmail.com",
        to: email,
        subject: "Portfolio Contact Form Submission",
        html: `<p>Thanks for submmiting the form , Isha will get in touch with you soon</p>
        <br><br>
                From: <img src="https://portfolio-server-sandy.vercel.app/signature.png" width="100">`,
                // From: <img src="https://logos.textgiraffe.com/logos/logo-name/Isha-designstyle-pastel-m.png" width="100">`,
      };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent to admin" });
      }
    });
    contactEmail.sendMail(mailclient, (error) => {
        if (error) {
          res.json({ status: "ERROR" });
        } else {
          res.json({ status: "Message Sent to client" });
        }
      });
  });