const { query } = require('express');
const express = require('express');
const pool = require('../database');

const AppError = require('../utils/appError');
const catchAsync  = require('../utils/catchAsync');


// show All post 
exports.showAllPost = catchAsync(async (req,res,next) =>{
    const sql = 'SELECT * FROM user_post';
    const showAllUserPost = await pool.query(sql);

    res.status(200).json({
        message: showAllUserPost.rows
    });
});

// show single post 
exports.showSinglePost = catchAsync(async (req,res,next) =>{
    post = {id: req.body.id}

    const sql = 'SELECT * FROM user_post WHERE id = $1';
    const values = [post.id];
    const showSingleUserPost = await pool.query(sql,values);

    res.status(200).json({
        message: showSingleUserPost.rows
    });
});

// create post 
exports.createPost = catchAsync(async (req,res,next) =>{
    // media is null until multer is added 
    userInfo = {
        userId: req.body.userId,
        titleText: req.body.titleText,
        descriptionText: req.body.descriptionText,
        media: null
    };

    const sql = 'INSERT INTO user_post(user_id, title_text, description_text, media) VALUES($1,$2,$3,$4) RETURNING*';
    const values = [userInfo.userId, userInfo.titleText, userInfo.descriptionText, userInfo.media];

    const createUserPost = await pool.query(sql,values);

    res.status(200).json({
        message: createUserPost.rows[0]
    });
});

// edit post 
exports.editPost = catchAsync(async (req,res,next) =>{
  
    userInfo = {
        titleText: req.body.titleText,
        descriptionText: req.body.descriptionText,
        media: null,
        id: req.body.id,
    };

    const sql = 'UPDATE user_post SET title_text = $1, description_text = $2  WHERE id = $3 RETURNING*';
    const values = [userInfo.titleText,userInfo.descriptionText, userInfo.id];
    const editUserPost = await pool.query(sql,values);

    res.status(200).json({
        message: editUserPost.rows[0]
    });
});

// delete post
exports.deletePost = catchAsync(async (req,res,next) => {
    const postId = {
        id: req.body.id
    };
    const sql = 'DELETE FROM user_post WHERE id = $1 RETURNING*';
    const values= [postId.id];
    const deleteUserPost = await pool.query(sql,values);

    res.status(200).json({
        message: deleteUserPost.rows[0]
    })
});
