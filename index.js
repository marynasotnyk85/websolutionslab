import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

const port = process.env.port;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
console.log("Credenziali ...... " + emailUser + emailPass);


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

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(emailPass);

app.post('/send-email', (req, res) => {
  const { email } = req.body;

  const msg = {
    to: emailUser,
    from: emailUser,
    subject: 'Email from GitHub',
    text: `Contenuto dell'email: ${email}`,
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email inviata');
      res.status(200).send('Email inviata con successo');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Errore nell\'invio dell\'email');
    });
});

  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
