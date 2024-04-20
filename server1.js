const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route for form submission
app.post('/submit-form', (req, res) => {
  const { name } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'portfolio', // Enter your Gmail address
      pass: 'llyr qnvw amig daai' // Enter your Gmail password
    }
  });

  // Email content
  const mailOptions = {
    from: 'inp2202gmail.com', // Sender address
    to: 'isha220102@gmail.com', // List of recipients
    subject: 'New Form Submission',
    text: `
      Name: ${name}
    `
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error); // Log the entire error object
      res.status(500).send('Something went wrong.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
