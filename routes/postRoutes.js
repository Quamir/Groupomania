const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();


router.post('/create', postController.createPost);
router.patch('/update', postController.editPost);
router.delete('/delete', postController.deletePost);

router.get('/allpost', postController.showAllPost);
router.get('/singlepost', postController.showSinglePost);

module.exports = router;