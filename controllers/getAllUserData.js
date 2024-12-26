// controllers/userController.js
import UserProfileModel from "../models/userProfile.js";

const getAllUserData = async (req, res) => {
    try {
        const users = await UserProfileModel.find(); // Fetch all users
        return res.status(200).json({ error: false, message: 'Users retrieved successfully', data: users });
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Error fetching users', data: null });
    }
}

export default getAllUserData;
