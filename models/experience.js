import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Job title or role
    company: { type: String, required: true }, // Company or organization name
    startDate: { type: Date, required: true }, // Start date of the experience
    endDate: { type: Date }, // End date of the experience (optional)
    description: { type: String }, // Description of the role and responsibilities
    location: { type: String }, // Location of the job (e.g., city, country)
    skills: { type: [String] }, // Array of skills used or gained in this role
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const ExperienceModel = mongoose.model("Experience", ExperienceSchema);

export default ExperienceModel;
