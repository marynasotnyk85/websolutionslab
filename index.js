
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

let transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP server details
    auth: {
      user: 'info.websolutionslab@gmail.com', // your email address
      pass: 'kwis bznv xecp bbdw', // your email password
    },
  });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/send-email", (req, res) => {
    var email = req.body.email; // Assuming you're using middleware like 'body-parser'
  
    console.log("Received email:", email);
  
    let mailOptions = {
        from: 'info.websolutionslab@gmail.com', // sender address
        to: 'info.websolutionslab@gmail.com', // recipient's email address
        subject: 'Email from webSite',
        text: 'Body of your email  --> '+ email,
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
