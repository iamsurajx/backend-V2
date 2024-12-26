import express from 'express';
import { createUserPreference, getUserPreference, updateUserPreference, deleteUserPreference } from '../controllers/UserProfilePreference.js';

const router = express.Router();

// Route to create a preference for a user
router.post('/:userId/preference', createUserPreference);

// Route to get a user's preference
router.get('/:userId/preference', getUserPreference);

// Route to update a user's preference
router.put('/:userId/preference/:preferenceId', updateUserPreference);

// Route to delete a user's preference
router.delete('/:userId/preference/:preferenceId', deleteUserPreference);

export default router;
