const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.uploadProfilePicture ,userController.createAccount);
router.post('/login', userController.login);
router.get('/user',authController.protect,userController.userData);
router.post('/id', authController.protect, userController.getUerId);
router.get('/profiles', authController.protect, userController.getProfiles);
router.post('/profile', authController.protect, userController.getProfile);
router.delete('/deleteaccount',  authController.protect, userController.deleteAccount);
router.patch('/changepassword', authController.protect, userController.changePassword);
router.patch('/changeemail', authController.protect, userController.changeEmail);
router.patch('/changename', authController.protect, userController.changeName);
router.patch(
    '/changeprofilepicture', 
    authController.protect,
    userController.uploadProfilePicture, 
    userController.changeProfilePicture
);

module.exports = router;