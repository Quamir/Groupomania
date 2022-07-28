const express = require('express');
const reactionsController = require('../controllers/reactionsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/like', authController.protect, reactionsController.likePost);
router.post('/angryreact', authController.protect, reactionsController.angryEmoji);
router.post('/cryreact', authController.protect, reactionsController.cryEmoji);
router.post('/heartreact', authController.protect, reactionsController.heartEyeEmoji);
router.post('/laughreact', authController.protect, reactionsController.laughEmoji);
router.post('/shockreact', authController.protect, reactionsController.shockEmoji);
router.post('/smilereact', authController.protect, reactionsController.smileEmoji);

router.post('/getreacts', authController.protect, reactionsController.getReacts);

module.exports = router;
