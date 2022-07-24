const express = require('express');
const pool = require('../database');
const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/commentModel');

// display all comments for a post 
exports.getAllComments = catchAsync(async (req,res,next) =>{
    const comment = new Comment(...[, , ,req.body.id]);
    const allComments = await comment.getAllComments();

    res.status(200).json({
        message: allComments
    })
});

// write comment
exports.createComment = catchAsync(async (req,res,next) =>{
    const comment = new Comment(
        req.body.postId,
        req.body.userId,
        req.body.text
    );
    const createUserComment =  await comment.createComment();

    res.status(200).json({
        message: createUserComment
    });
});

// edit comment 
exports.editComment = catchAsync(async (req,res,next) =>{
    const comment =  new Comment(
        ...[
            ,
            ,
            req.body.text,
            req.body.id
        ]
    );
    const editUserComment = await comment.editComment();
    
    res.status(200).json({
        message: editUserComment
    });
});

// delete comment 
exports.deleteComment = catchAsync(async (req,res,next) =>{
    const comment = new Comment(...[, , ,req.body.id]);
    const deleteUserComment = await comment.deleteComment();

    res.status(201).json({
        message: deleteUserComment
    });
});