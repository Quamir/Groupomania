const express = require('express');
const reactionsController = require('../controllers/reactionsController');

const router = express.Router();

router.post('/like', reactionsController.likePost);


module.exports = router;
