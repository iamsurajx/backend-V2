import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String },
    institution: { type: String },
    currentlyStudying: { type: Boolean },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
  },
  { timestamps: true }
);

const EducationModel = mongoose.model("Education", EducationSchema);
export default EducationModel;
