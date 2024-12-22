import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projectt", ProjectSchema);
export default ProjectModel;
