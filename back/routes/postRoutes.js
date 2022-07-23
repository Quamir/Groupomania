const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

// user interaction routes
router.post('/create', authController.protect, postController.uploadPostMedia,postController.createPost);
router.patch('/update', authController.protect, postController.editPost);
router.delete('/delete', authController.protect, postController.deletePost);
// display routes 
router.post('/allpost', authController.protect, postController.showAllPost);
router.get('/singlepost', authController.protect, postController.showSinglePost);
router.get('/mostlikes', authController.protect, postController.mostLikePost);

module.exports = router;