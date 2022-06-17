const express = require('express');
const pool = require('../database');

const catchAsync = require('../utils/catchAsync');

// write comment
exports.createComment = catchAsync(async (req,res,next) =>{
    const comment = {
        postId: req.body.postId,
        userId: req.body.userId,
        text: req.body.text
    };
    const sql = 'INSERT INTO post_comment(post_id,user_id,comment_text) VALUES($1,$2,$3) RETURNING*';
    const values = [comment.postId,comment.userId,comment.text];
    const createUserComment = await pool.query(sql,values);

    res.status(200).json({
        message: createUserComment.rows
    });
});

// edit comment 
exports.editComment = catchAsync(async (req,res,next) =>{
    const comment = {
        id: req.body.id,
        text: req.body.text
    };
    const sql = 'UPDATE post_comment SET comment_text = $1, time_stamp = CURRENT_TIMESTAMP WHERE id = $2 RETURNING*';
    const values = [comment.text, comment.id];
    const editUserComment = await pool.query(sql,values);

    res.status(200).json({
        message: editUserComment.rows
    });
});

// delete comment 
exports.deleteComment = catchAsync(async (req,res,next) =>{
    const comment = {
        id: req.body.id
    };
    const sql = 'DELETE FROM post_comment WHERE id = $1 RETURNING*';
    const values = [comment.id];
    const deleteUserComment = await pool.query(sql,values);

    res.status(200).json({
        message: deleteUserComment.rows
    });
});