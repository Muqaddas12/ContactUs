import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sendMail from "./routes/sendmail.mjs";
import dotenv from 'dotenv'
import serverless from "serverless-http";
dotenv.config()
const PORT=process.env.PORT||3000
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use('/', sendMail);

// ✅ Conditional server or export
const isLocal = process.env.LOCAL === "true";

if (isLocal) {
  app.listen(PORT, () => {
    console.log("Running locally on http://localhost:" + PORT);
  });
}
  // ✅ Export for Vercel
export const handler = serverless(app);
