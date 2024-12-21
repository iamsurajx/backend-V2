import express from "express";


import AuthRoutes from "./routes/authRoutes.js"; // Assuming you have this set up for authentication
import bodyParser from "body-parser"; 
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "./routes/fileUploader.js";

import {connectDB} from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9080;

connectDB();

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors());

// Middleware
app.use(bodyParser.json());



app.use("/auth", AuthRoutes); // Authentication routes
app.use(`/api`, fileUpload); // File upload routes




app.get("/", (req, res) => {
  res.send("ExpressJS is running....");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

