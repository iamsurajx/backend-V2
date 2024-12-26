import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    verificationCode: { type: String }, // OTP
    isVerified: { type: Boolean, default: false }, // Email verified or not
    name: { type: String }, // Added later during signup completion
    password: { type: String },
    referralCode: { type: String },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
    preference: { type: mongoose.Schema.Types.ObjectId, ref: "UserPreference" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;

