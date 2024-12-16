const express = require('express');
const router = express.Router();
const resumeController = require('./resumeController');

router.post('/create/resume', resumeController.createResume);
router.post('/get/resumes', resumeController.getResumes);

module.exports = router;