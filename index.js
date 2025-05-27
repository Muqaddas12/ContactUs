import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import serverless from "serverless-http";  // Uncommented
import dotenv from "dotenv";
import sendMail from "./routes/sendMail.mjs";
import cors from 'cors';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware & Config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ user: 'geek' });
});

// Local dev check
const PORT = process.env.PORT || 3000;
const isLocal = process.env.LOCAL === 'true';

if (isLocal) {
  app.listen(PORT, () => {
    console.log(`Running locally at http://localhost:${PORT}`);
  });
}

// Export for Vercel (serverless)
export default serverless(app);  // Now enabled