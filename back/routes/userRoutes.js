const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.uploadProfilePicture ,userController.createAccount);
router.post('/login', userController.login);
router.delete('/deleteaccount', userController.deleteAccount);
router.patch('/changepassword', authController.protect, userController.changePassword);
router.patch('/changeemail', authController.protect, userController.changeEmail);
router.patch('/changename', authController.protect, userController.changeName);


module.exports = router;