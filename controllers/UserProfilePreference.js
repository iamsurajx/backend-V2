import UserProfilePreferenceModel from '../models/preference.js'; // import the model
import UserModel from '../models/user.js'; // import the user model

// Create a preference
const createUserPreference = async (req, res) => {
  try {
    // Create a new preference document
    const { status, birthday, location, skillSet, industries, priorStartupExperience, commitmentLevel, equityExpectation } = req.body;

    const newPreference = new UserProfilePreferenceModel({
      status,
      birthday,
      location,
      skillSet,
      industries,
      priorStartupExperience,
      commitmentLevel,
      equityExpectation,
    });

    // Save the preference
    const savedPreference = await newPreference.save();

    // Update the user's preference field with the created preference
    const userId = req.params.userId; // Assume userId is passed in the params
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.preference = savedPreference._id;
    await user.save();

    return res.status(201).json({
      preferenceId: savedPreference._id,
      userId: user._id,
      message: 'User preference created successfully!',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user preference' });
  }
};

// Read a user's preference
const getUserPreference = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from params

    const user = await UserModel.findById(userId).populate('preference');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user.preference);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving user preference' });
  }
};

// Update a user's preference
const updateUserPreference = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from params
    const preferenceId = req.params.preferenceId; // Get the preference ID from params

    const updatedData = req.body; // The data to update

    const updatedPreference = await UserProfilePreferenceModel.findByIdAndUpdate(
      preferenceId,
      updatedData,
      { new: true } // Return the updated document
    );

    if (!updatedPreference) {
      return res.status(404).json({ message: 'Preference not found' });
    }

    return res.status(200).json({ message: 'Preference updated successfully', updatedPreference });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user preference' });
  }
};

// Delete a user's preference
const deleteUserPreference = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from params
    const preferenceId = req.params.preferenceId; // Get the preference ID from params

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the reference to the preference from the user document
    user.preference = null;
    await user.save();

    // Now delete the preference document
    const deletedPreference = await UserProfilePreferenceModel.findByIdAndDelete(preferenceId);

    if (!deletedPreference) {
      return res.status(404).json({ message: 'Preference not found' });
    }

    return res.status(200).json({ message: 'Preference deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting user preference' });
  }
};

export { createUserPreference, getUserPreference, updateUserPreference, deleteUserPreference };
