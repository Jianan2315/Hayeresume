const express = require('express');
const router = express.Router();
const userController = require('./userController');
const auth = require("../middleware");

router.post('/signup', userController.createUser);
router.get('/get/users', auth, userController.getUsers);
router.post('/login', userController.validateUser);
router.post("/delete/user", auth, userController.deleteUser);
router.post("/logout", auth, userController.logout);
router.post("/update/pass", auth, userController.updatePass);
router.get("/info", auth, userController.getUser);

module.exports = router;