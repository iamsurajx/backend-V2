import express from "express";


import AuthRoutes from "./routes/authRoutes.js"; // Assuming you have this set up for authentication
import bodyParser from "body-parser"; 
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "./routes/fileUploader.js";
import profile from "./routes/profileroutes.js"
import userPreference from "./routes/userPreference.js";
import { authenticate } from "./middlewaers/authenticate.js";
import {connectDB} from "./config/db.js";
import profileFilter from "./routes/profileFilter.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 9080;

connectDB();

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors());

// Middleware
app.use(bodyParser.json());


// Protected route example
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

app.use("/auth", AuthRoutes); // Authentication routes
app.use("/api", fileUpload); // File upload routes
app.use("/api", profile); // Profile routes  
app.use("/api", userPreference); // Profile routes  
app.use("/api", profileFilter); // Profile routes  




app.get("/", (req, res) => {
  res.send("ExpressJS is running....");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

