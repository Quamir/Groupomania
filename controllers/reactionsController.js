const express = require('express');
const pool = require('../database');

const catchAsync = require('../utils/catchAsync');

exports.likePost = catchAsync(async (req,res,next) =>{
    const like = {
        id: req.body.id,
        likeOrunlike: req.body.likeOrunlike,
        postId: req.body.postId,
        userId: req.body.userId
    }

    let sql;
    let values;

    if(like.likeOrunlike === 1){
        sql = 'INSERT INTO post_like(post_id, user_id) VALUES($1,$2) RETURNING*';
        values = [like.postId, like.userId];
    }else{
        sql = 'DELETE FROM post_like WHERE id = $1 RETURNING*'
        values = [like.id];
    }
    
    const likeUserPost = await pool.query(sql,values);

    res.status(201).json({
        message: likeUserPost.rows
    });
});