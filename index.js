import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS and views directory (views is outside /api)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from serverless function!"); // use render after views work
});

app.post("/contactUs", async (req, res) => {
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

export default serverless(app); // ✅ Correct export for Vercel
