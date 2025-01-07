const Resume = require('./resumeModel');
const User = require('../user/userModel');

exports.createResume = async (req, res) => {
    try {
        if (req.user.role !== 'user') return res.status(403).send('Access denied.');
        const { email, thumbnail, json, templateId } = req.body;
        if (!email || !thumbnail || !json || !templateId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const resume = new Resume({ email, thumbnail, json, templateId });
        await resume.save();
        res.status(201).json({ message: 'Resume created in database successfully', resume });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.createResumeWithoutAuth = async (req, res) => {
    try {
        const { email, thumbnail, json, templateId } = req.body;
        if (!email || !thumbnail || !json || !templateId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const resume = new Resume({ email, thumbnail, json, templateId });
        await resume.save();
        res.status(201).json({ message: 'Resume created in database successfully', resume });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getResumes = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const resumes = await Resume.find({email: user.email}).limit(2);
        res.status(200).json({ message: 'Resumes retrieved successfully', resumes });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateResume = async (req, res) => {
    try {
        if (req.user.role !== 'user') return res.status(403).send('Access denied.');
        const { id, json, thumbnail } = req.body;
        const updatedRecord = await Resume.findOneAndUpdate(
            { _id: id },
            {
                    $set: {
                        json: json,
                        thumbnail: thumbnail
                    }
            }
        );

        if (updatedRecord) {
            res.status(200).json({ message: 'Resume updated successfully'});
        } else {
            console.log("Invalid update request.");
            res.status(400).json({ message: 'Invalid update request.'});
        }
    } catch (error) {
        console.error("Error updating record:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateResumeWithoutAuth = async (req, res) => {
    try {
        const { id, json, thumbnail } = req.body;
        const updatedRecord = await Resume.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    json: json,
                    thumbnail: thumbnail
                }
            }
        );

        if (updatedRecord) {
            res.status(200).json({ message: 'Resume updated successfully'});
        } else {
            console.log("Invalid update request.");
            res.status(400).json({ message: 'Invalid update request.'});
        }
    } catch (error) {
        console.error("Error updating record:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
// Test only
exports.getResumesWithoutAuth = async (req, res) => {
    try {
        const { email } = req.body;
        const resumes = await Resume.find({email}).limit(28);
        res.status(200).json({ message: 'Resumes retrieved successfully', resumes });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};