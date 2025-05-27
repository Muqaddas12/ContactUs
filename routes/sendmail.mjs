import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

const sendMail = express.Router();

sendMail.post("/contactUs", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Create transporter with secret values
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: EMAIL,
    subject: "Socta Page Query",
    html: `
      <h3>Contact Details</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
   return res.redirect('/?msg=Message sent successfully!')
  } catch (error) {
    console.error("Error sending email:", error);
   return res.redirect('/?msg=Something went wrong.')
  }
});

export default sendMail;
