const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.createAccount);
router.post('/login', userController.login);
router.delete('/deleteaccount', userController.deleteAccount);
router.patch('/changepassword', userController.changePassword);
router.patch('/changeemail', userController.changeEmail);
router.patch('/changename', userController.changeName);


module.exports = router;