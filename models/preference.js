import mongoose from "mongoose";

const UserProfilePreference = new mongoose.Schema(
  {
    status: { type: String }, // User's current status (e.g., "Looking for a co-founder")
    birthday: { type: String }, // User's date of birth (e.g., 1990-01-01)
    location: { type: String }, // User's current location
    skillSet: { type: [String] }, // Array of skills (e.g., ['JavaScript', 'Design'])
    industries: { type: [String] }, // Array of interests or industries (e.g., ['AI', 'FinTech'])
    priorStartupExperience: { type: String }, // Boolean indicating prior experience (e.g., true, false)
    commitmentLevel: { type: String }, // Level of commitment (e.g., "Part-Time", "Full-Time")
    equityExpectation: { type: String }, // Expected equity range (e.g., "10-20%")
  },
  { timestamps: true }
);

const UserProfilePreferenceModel = mongoose.model("UserPreference", UserProfilePreference);
export default UserProfilePreferenceModel;



// import mongoose from "mongoose";

// const UserProfilePreference = new mongoose.Schema(
//     {
//     status: { type: String }, // User's current status (e.g., "Looking for a co-founder")
//     birthday: { type:String }, // User's date of birth (e.g., 1990-01-01)
//     location: { type: String }, // User's current location
//     skillSet: { type: [String] }, // Array of skills (e.g., ['JavaScript', 'Design'])
//     industries: { type: [String] }, // Array of interests or industries (e.g., ['AI', 'FinTech'])
//     priorStartupExperience: { type: String }, // Boolean indicating prior experience (e.g., true, false)
//     commitmentLevel: { type: String }, // Level of commitment (e.g., "Part-Time", "Full-Time")
//     equityExpectation: { type: String }, // Expected equity range (e.g., "10-20%")
//   },
//   { timestamps: true }
// );

// const UserProfilePreferenceModel = mongoose.model("UserPreference", UserProfilePreference);
// export default UserProfilePreferenceModel;
