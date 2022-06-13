const express = require('express');
const factory = require('./handlerFactory');

// likes
const insertLike = 'INSERT INTO post_like(post_id, user_id) VALUES($1,$2) RETURNING*';
const deleteLike = 'DELETE FROM post_like WHERE id = $1 RETURNING*';
// angry emojis 
const addAngryEmoji = 'INSERT INTO angry_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const removeAngryEmoji = 'DELETE FROM angry_emoji WHERE id = $1 RETURNING*';
// cry emoji
const addCryEmoji = 'INSERT INTO cry_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const removeCryEmoji = 'DELETE FROM cry_emoji WHERE id = $1 RETURNING*';
// heart eye emoji
const addHeartEyeEmoji = 'INSERT INTO heart_eye_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const removeHeartEyeEmoji = 'DELETE FROM cry_emoji WHERE id = $1 RETURNING*';
// laugh_emoji 
const addLaughEmoji = 'INSERT INTO laugh_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const removeLaughEmoji = 'DELETE FROM laugh_emoji WHERE id = $1 RETURNING*';
// shock_emoji
const addShockEmoji = 'INSERT INTO shock_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const removeShockEmoji = 'DELETE FROM shock_emoji WHERE id = $1 RETURNING*';
// smile_emoji
const addSmileEmoji = 'INSERT INTO smile_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
const removeSmileEmoji = 'DELETE FROM smile_emoji WHERE id = $1 RETURNING*';


exports.likePost = factory.reaction(insertLike,deleteLike);
exports.angryEmoji = factory.reaction(addAngryEmoji,removeAngryEmoji);
exports.cryEmoji = factory.reaction(addCryEmoji,removeCryEmoji);
exports.heartEyeEmoji = factory.reaction(addHeartEyeEmoji,removeHeartEyeEmoji);
exports.laughEmoji = factory.reaction(addLaughEmoji,removeLaughEmoji);
exports.shockEmoji = factory.reaction(addShockEmoji,removeShockEmoji);
exports.smileEmoji = factory.reaction(addSmileEmoji,removeSmileEmoji);