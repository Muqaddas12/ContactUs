import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import serverless from "serverless-http";
import dotenv from "dotenv";
import sendMail from "./routes/sendMail.mjs";
import cors from 'cors'

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set EJS and views directory (views is outside /api)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', function (req, res) {
    res.json({ user: 'geek' });
});
const PORT=process.env.PORT
const isLocal=process.env.LOCAL

if(isLocal==='true'){
  console.log(isLocal) 
  app.listen(PORT,()=>{
    console.log(`app is running http://localhost:3000`) 
  })
}

export default serverless(app); 