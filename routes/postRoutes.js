const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// user interaction routes
router.post('/create', postController.createPost);
router.patch('/update', postController.editPost);
router.delete('/delete', postController.deletePost);
// display routes 
router.get('/allpost', postController.showAllPost);
router.get('/singlepost', postController.showSinglePost);

module.exports = router;