import nodemailer from "nodemailer";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const sendMail=express.Router();
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;


sendMail.get("/", (req, res) => {
return res.render('ContactUs')
});

sendMail.post("/contactUs", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

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
    return res.redirect("/?msg=Message sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    return res.redirect("/?msg=Something went wrong.");
  }
});

export default sendMail