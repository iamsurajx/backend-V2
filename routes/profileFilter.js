import express from 'express';
import User from '../models/userProfile.js'; // Ensure User.js is also an ESM or has appropriate handling
const router = express.Router();

router.post('/users/filter', async (req, res) => {
    const {
        status,
        birthday,
        location,
        skillSet,
        industries,
        priorStartupExperience,
        commitmentLevel,
        equityExpectation
    } = req.body;

    const query = {};
        if (status) {
            query.status = status;
        } 
        
        if (!query.status && birthday) {
            query.birthday = birthday;
        }
        
        if (!query.status && !query.birthday && location) {
            query.location = location;
        }
        
        if (!query.status && !query.birthday && !query.location && skillSet && skillSet.length > 0) {
            query.skillSet = { $in: skillSet };
        }
        
        if (!query.status && !query.birthday && !query.location && !query.skillSet && industries && industries.length > 0) {
            query.industries = { $in: industries };
        }
        
        if (!query.status && !query.birthday && !query.location && !query.skillSet && !query.industries && priorStartupExperience !== undefined) {
            query.priorStartupExperience = priorStartupExperience;
        }
        
        if (!query.status && !query.birthday && !query.location && !query.skillSet && !query.industries && commitmentLevel) {
            query.commitmentLevel = commitmentLevel;
        }
        
        if (!query.status && !query.birthday && !query.location && !query.skillSet && !query.industries && equityExpectation) {
            query.equityExpectation = equityExpectation;
        }
        
        
    try {
        const users = await User.find(query);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;