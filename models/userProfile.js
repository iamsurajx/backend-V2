import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
    {
    status: { type: String }, // User's current status (e.g., "Looking for a co-founder")
    profilePhoto: { type: String }, // URL or file upload for the profile picture
    birthday: { type:String }, // User's date of birth (e.g., 1990-01-01)
    bio: { type: String }, // Text bio or mindset description
    location: { type: String }, // User's current location
    skillSet: { type: [String] }, // Array of skills (e.g., ['JavaScript', 'Design'])
    industries: { type: [String] }, // Array of interests or industries (e.g., ['AI', 'FinTech'])
    priorStartupExperience: { type: String }, // Boolean indicating prior experience (e.g., true, false)
    commitmentLevel: { type: String }, // Level of commitment (e.g., "Part-Time", "Full-Time")
    equityExpectation: { type: String }, // Expected equity range (e.g., "10-20%")

    // References to separate collections
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
    experience: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

const UserProfileModel = mongoose.model("UserProfile", UserProfileSchema);
export default UserProfileModel;
