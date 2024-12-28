import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () => {
  mongoose.connect("mongodb+srv://connect:SYo1XnmCJWVgVSys@cluster0.b57i5.mongodb.net/ventureLoop", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Helps to avoid deprecated warnings
  });

  mongoose.connection
    .once("open", function () {
      console.log("Connection has been made!");
    })
    .on("error", function (error) {
      console.log("Error is: ", error);
    });
};

export { connectDB };
