import express from "express";
import {
  saveUserProfileDetails,
  getUserProfileDetails,
  updateUserProfileDetails,
} from "../controllers/profileController.js";

const router = express.Router();

// Route to save or update user profile details
router.post("/user/:userId", saveUserProfileDetails);

// Route to get user profile details
router.get("/user/:userId", getUserProfileDetails);

// Route to update user profile details
router.put("/user/:userId", updateUserProfileDetails);

// Optional: Route to delete user profile
// router.delete('/user/:userId/profile', deleteUserProfile);

export default router;
