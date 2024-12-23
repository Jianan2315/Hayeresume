const express = require('express');
const router = express.Router();
const resumeController = require('./resumeController');
const auth = require("../middleware");

router.post('/create/resume', resumeController.createResume);
router.get('/get/resumes', auth, resumeController.getResumes);
router.post('/test/resumes', resumeController.getResumesWithoutAuth);

module.exports = router;