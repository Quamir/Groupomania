const express = require('express');
const reactionsController = require('../controllers/reactionsController');

const router = express.Router();

router.post('/like', reactionsController.likePost);
router.post('/angryreact', reactionsController.angryEmoji);
router.post('/cryreact', reactionsController.cryEmoji);
router.post('/heartreact', reactionsController.heartEyeEmoji);
router.post('/laughreact', reactionsController.laughEmoji);
router.post('/shcokreact', reactionsController.shockEmoji);
router.post('/smilereact', reactionsController.smileEmoji);

module.exports = router;
