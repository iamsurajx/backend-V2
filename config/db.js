import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.MongoDB_URI, {
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
