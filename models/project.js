import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);
export default ProjectModel;
