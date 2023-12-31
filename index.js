

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
const emailWebSite = process.env.EMAIL_USER;
const emailPassWebSite = process.env.EMAIL_PASS;




app.use(express.static('public'));
app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



let transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP server details
    auth: {
      user: emailWebSite,
      pass: emailPassWebSite
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
    var emailUser = req.body.email; // Assuming you're using middleware like 'body-parser'
  
    console.log("Received email:", emailUser);
  
    let mailOptions = {
        from: emailWebSite, // sender address
        to: emailWebSite, // recipient's email address
        subject: 'Email from webSite',
        text: 'Email dal sito -->      '+ emailUser,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error(error);
        }
        console.log('Message sent: %s', info);
        
      });
    
      res.send("Email sent successfully");
     
  });

  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});