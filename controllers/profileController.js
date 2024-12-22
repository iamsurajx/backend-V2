import UserModel from "../models/user.js";
import UserProfileModel from "../models/userProfile.js";
import EducationModel from "../models/education.js";
import ExperienceModel from "../models/experience.js";
import ProjectModel from "../models/project.js";

export const saveUserProfileDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters
    const {
      skillSet,
      industries,
      priorStartupExperience,
      commitmentLevel,
      equityExpectation,
      status,
    } = req.body; // Extract profile details from request body

    // Check if the user exists
    const user = await UserModel.findById(userId).populate("profile");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user has a profile
    if (!user.profile) {
      // If no profile exists, create a new profile
      const newProfile = new UserProfileModel({
        skillSet,
        industries,
        priorStartupExperience,
        commitmentLevel,
        equityExpectation,
        status,
      });

      // Save the new profile and link it to the user
      await newProfile.save();
      user.profile = newProfile._id;
      await user.save();

      return res.status(201).json({
        success: true,
        message: "Profile created successfully.",
        profile: newProfile,
      });
    }

    // If a profile exists, update it
    const userProfile = user.profile;
    userProfile.skillSet = skillSet || userProfile.skillSet;
    userProfile.industries = industries || userProfile.industries;
    userProfile.priorStartupExperience =
      priorStartupExperience ?? userProfile.priorStartupExperience;
    userProfile.commitmentLevel =
      commitmentLevel || userProfile.commitmentLevel;
    userProfile.equityExpectation =
      equityExpectation || userProfile.equityExpectation;
    userProfile.status = status || userProfile.status;

    // Save the updated profile
    await userProfile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile: userProfile,
    });
  } catch (error) {
    console.error("Error saving user profile details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getUserProfileDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Check if the user exists and populate profile data including education, experience, and projects
    const user = await UserModel.findById(userId).populate({
      path: "profile",
      populate: [
        {
          path: "education",
          model: "Education", // Populate the Education model
        },
        {
          path: "experience",
          model: "Experience", // Populate the Experience model
        },
        {
          path: "projects",
          model: "Project", // Populate the Project model
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user has a profile
    if (!user.profile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    // Return the user and profile details
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      user: {
        userId: user._id,
        email: user.email, // Example, add other fields as necessary
        name: user.name, // Example, add other fields as necessary
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateUserProfileDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters
    const {
      status,
      profilePhoto,
      birthday,
      bio,
      location,
      skillSet,
      industries,
      priorStartupExperience,
      commitmentLevel,
      equityExpectation,
      education, // Array of updated education data (objects)
      experience, // Array of updated experience data (objects)
      projects, // Array of updated project data (objects)
    } = req.body; // Extract profile details from request body

    // Check if the user exists and populate profile
    const user = await UserModel.findById(userId).populate("profile");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user has a profile
    if (!user.profile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    // Update the profile fields
    const userProfile = user.profile;
    userProfile.status = status || userProfile.status;
    userProfile.profilePhoto = profilePhoto || userProfile.profilePhoto;
    userProfile.birthday = birthday || userProfile.birthday;
    userProfile.bio = bio || userProfile.bio;
    userProfile.location = location || userProfile.location;
    userProfile.skillSet = skillSet || userProfile.skillSet;
    userProfile.industries = industries || userProfile.industries;
    userProfile.priorStartupExperience =
      priorStartupExperience ?? userProfile.priorStartupExperience;
    userProfile.commitmentLevel =
      commitmentLevel || userProfile.commitmentLevel;
    userProfile.equityExpectation =
      equityExpectation || userProfile.equityExpectation;

    // Handle the update for education, experience, and projects
    if (education) {
      // Check if each education entry already exists; if not, create a new one
      const updatedEducation = await Promise.all(
        education.map(async (edu) => {
          let educationEntry = await EducationModel.findOne({
            degree: edu.degree,
            institution: edu.institution,
          });
          if (!educationEntry) {
            educationEntry = new EducationModel(edu);
            await educationEntry.save();
          } else {
            // If it exists, update the existing document
            educationEntry = await EducationModel.findByIdAndUpdate(
              educationEntry._id,
              edu,
              {
                new: true,
              }
            );
          }
          return educationEntry._id;
        })
      );
      userProfile.education = updatedEducation;
    }

    if (experience) {
      // Check if each experience entry already exists; if not, create a new one
      const updatedExperience = await Promise.all(
        experience.map(async (exp) => {
          let experienceEntry = await ExperienceModel.findOne({
            title: exp.title,
            company: exp.company,
          });
          if (!experienceEntry) {
            experienceEntry = new ExperienceModel(exp);
            await experienceEntry.save();
          } else {
            // If it exists, update the existing document
            experienceEntry = await ExperienceModel.findByIdAndUpdate(
              experienceEntry._id,
              exp,
              {
                new: true,
              }
            );
          }
          return experienceEntry._id;
        })
      );
      userProfile.experience = updatedExperience;
    }

    if (projects) {
      // Check if each project entry already exists; if not, create a new one
      const updatedProjects = await Promise.all(
        projects.map(async (proj) => {
          let projectEntry = await ProjectModel.findOne({
            name: proj.name,
            link: proj.link,
          });
          if (!projectEntry) {
            projectEntry = new ProjectModel(proj);
            await projectEntry.save();
          } else {
            // If it exists, update the existing document
            projectEntry = await ProjectModel.findByIdAndUpdate(
              projectEntry._id,
              proj,
              {
                new: true,
              }
            );
          }
          return projectEntry._id;
        })
      );
      userProfile.projects = updatedProjects;
    }

    // Save the updated profile
    await userProfile.save();

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      profile: userProfile,
    });
  } catch (error) {
    console.error("Error updating user profile details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

