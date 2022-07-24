const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

// user interaction routes
router.post('/create', authController.protect, postController.uploadPostMedia,postController.createPost);
router.patch('/update', authController.protect, postController.editPost);
router.delete('/delete', authController.protect, postController.deletePost);
// display routes 
router.get('/mostlikes', authController.protect, postController.mostLikePost);
router.get('/mostcommented', authController.protect, postController.mostCommentedPost);
router.get('/mostinteractions', authController.protect, postController.mostInteractions);
router.post('/allpost', authController.protect, postController.showAllPost);
router.post('/singlepost', authController.protect, postController.showSinglePost);
router.post('/profilepost', authController.protect, postController.profilePost);

module.exports = router;