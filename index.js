

import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

import axios from "axios";

import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const router = express.Router();

const port = process.env.port;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;



app.use(express.static('public'));
app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



let transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP server details
    auth: {
      user: emailUser,
      pass: emailPass
    },
  });

  app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/privacy.html", (req, res) => {
  res.sendFile(__dirname + "/privacy.html");
});
app.get('/cookie_policy', (req, res) => {
  // Qui inserisci il contenuto dell'informativa sui cookie
  res.sendFile(__dirname + "/cookie_policy.html");
  //res.send('<h1>Informativa sui Cookie</h1><p>...</p>');
});


app.post("/send-email", (req, res) => {
  console.log("backend email " + req.body.email)
    var email = req.body.email; // Assuming you're using middleware like 'body-parser'
  
  
    let mailOptions = {
        from: emailUser, // sender address
        to:emailUser, // recipient's email address
        subject: 'Email from webSite',
        text: 'Body of your email  -->      '+ email,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error(error);
        }
        console.log('Message sent: %s', info);
        
      });
    
     res.send("Email sent successfully");
     
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  

  app.post("/send-email-after", async (req, res) => {
console.log("Back end");
    try {
      var email = req.body.email; 
     if (validateEmail(email)) {
     
     let mailOptions = {
         from: emailUser, // sender address
         to:emailUser, // recipient's email address
         subject: 'Email from webSite',
         text: 'Body of your email  -->      '+ email,
       };
     
       transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
           return console.error(error);
         }
         console.log('Message sent: %s', info);
         
       });

       let notification = "Email sent successfully";
       res.render('index.ejs', { notification });
    } else {
       // Set error message
       let notification = "Invalid email address";
       res.render('index.ejs', { notification });
    }
    } catch (error) {
      console.log(error);
    }

  });
  

  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//app.use( '/index/', router);
//module.exports.handler = serverless(app);
//export const handler = serverless(app);
