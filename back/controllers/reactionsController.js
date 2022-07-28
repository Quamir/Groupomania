const express = require('express');
const factory = require('./handlerFactory');
const React = require('../models/reactionsModel');
const catchAsync = require('../utils/catchAsync');

// likes
const insertLike = 'INSERT INTO post_like(post_id, user_id) VALUES($1,$2) RETURNING*';
const checkLikes = 'SELECT * FROM post_like WHERE user_id = $1';
const deleteLike = 'DELETE FROM post_like WHERE user_id = $1 RETURNING*';
// angry emojis 
const addAngryEmoji = 'INSERT INTO angry_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const checkAngryEmoji = 'SELECT * FROM angry_emoji WHERE user_id = $1';
const removeAngryEmoji = 'DELETE FROM angry_emoji WHERE user_id = $1 RETURNING*';
// cry emoji
const addCryEmoji = 'INSERT INTO cry_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const checkCryEmoji = 'SELECT * FROM cry_emoji WHERE user_id = $1';
const removeCryEmoji = 'DELETE FROM cry_emoji WHERE user_id = $1 RETURNING*';
// heart eye emoji
const addHeartEyeEmoji = 'INSERT INTO heart_eye_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const checkHeartEyeEmoji = 'SELECT * FROM heart_eye_emoji WHERE user_id = $1';
const removeHeartEyeEmoji = 'DELETE FROM heart_eye_emoji WHERE user_id = $1 RETURNING*';
// laugh_emoji 
const addLaughEmoji = 'INSERT INTO laugh_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const checkLaughEmoji = 'SELECT * FROM laugh_emoji WHERE user_id = $1';
const removeLaughEmoji = 'DELETE FROM laugh_emoji WHERE user_id = $1 RETURNING*';
// shock_emoji
const addShockEmoji = 'INSERT INTO shock_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const chcekShockEmoji = 'SELECT * FROM shock_emoji WHERE user_id = $1';
const removeShockEmoji = 'DELETE FROM shock_emoji WHERE user_id = $1 RETURNING*';
// smile_emoji
const addSmileEmoji = 'INSERT INTO smile_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const checkSmileEmoji = 'SELECT * FROM smile_emoji WHERE user_id = $1';
const removeSmileEmoji = 'DELETE FROM smile_emoji WHERE user_id = $1 RETURNING*';


exports.likePost = factory.reaction(checkLikes,insertLike,deleteLike);
exports.angryEmoji = factory.reaction(checkAngryEmoji,addAngryEmoji,removeAngryEmoji);
exports.cryEmoji = factory.reaction(checkCryEmoji,addCryEmoji,removeCryEmoji);
exports.heartEyeEmoji = factory.reaction(checkHeartEyeEmoji,addHeartEyeEmoji,removeHeartEyeEmoji);
exports.laughEmoji = factory.reaction(checkLaughEmoji,addLaughEmoji,removeLaughEmoji);
exports.shockEmoji = factory.reaction(chcekShockEmoji,addShockEmoji,removeShockEmoji);
exports.smileEmoji = factory.reaction(checkSmileEmoji,addSmileEmoji,removeSmileEmoji);

exports.getReacts = catchAsync(async (req,res,next) =>{
    const react = new React(req.body.id);
    const getReacts = await react.getReacts();

    res.status(200).json({
        message: getReacts
    });
});