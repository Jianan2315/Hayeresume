const express = require('express');
const router = express.Router();
const resumeController = require('./resumeController');
const auth = require("../middleware");

router.post('/create/resume', auth, resumeController.createResume);
router.get('/get/resumes', auth, resumeController.getResumes);
router.post('/update/resume', auth, resumeController.updateResume);

router.post('/test/create/resume', resumeController.createResumeWithoutAuth);
router.post('/test/get/resumes', resumeController.getResumesWithoutAuth);
router.post('/test/update/resume', resumeController.updateResumeWithoutAuth);

module.exports = router;