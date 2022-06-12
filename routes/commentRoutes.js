const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/write', commentController.createComment);
router.patch('/edit', commentController.editComment);
router.delete('/delete', commentController.deleteComment);

module.exports = router;