const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/write', authController.protect, commentController.createComment);
router.patch('/edit', authController.protect, commentController.editComment);
router.delete('/delete', authController.protect, commentController.deleteComment);

module.exports = router;