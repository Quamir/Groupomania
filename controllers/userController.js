const express = require('express');
const pool = require('../database');

const AppError = require('../utils/appError');
const catchAsync  = require('../utils/catchAsync');
const factory = require('./handlerFactory');


// create an account

exports.createAccount = catchAsync(async (req,res,next) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    const sql =  'INSERT INTO user_account(first_name, last_name,email, user_password) VALUES($1,$2,$3,$4) RETURNING*';
    const values = [user.firstName, user.lastName, user.email, user.password];

    const newAccount = await pool.query(sql,values);

    res.status(200).json({
        message: newAccount.rows[0]
    });
});

// Log in 
exports.login = catchAsync(async (req,res,next) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password
    };

    const sql = 'SELECT email, user_password FROM user_account WHERE email = $1 AND user_password = $2';
    const values = [userInfo.email, userInfo.password];

    const login = await pool.query(sql,values);

    res.status(200).json({
        message: login.rows[0]
    });
});

// delete account
exports.deleteAccount = catchAsync(async (req,res,next) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password
    };

    const sql = 'DELETE FROM user_account WHERE email = $1 AND user_password = $2';
    const values = [userInfo.email, userInfo.password];

    const deleteUserAccount = await pool.query(sql,values);

    res.status(200).json({
        message: deleteUserAccount
    });
});

// change password 
exports.changePassword = catchAsync(async (req,res,next) =>{
    const userInfo = {
        newPassword: req.body.newPassword,
        email: req.body.email,
        password: req.body.password
    };

    const sql = 'UPDATE user_account SET user_password = $1 WHERE email = $2 AND user_password = $3';
    const values = [userInfo.newPassword, userInfo.email, userInfo.password];

    const changeUserPassword = await pool.query(sql,values);

    res.status(200).json({
        message: changeUserPassword
    });
});

// change email
exports.changeEmail = catchAsync(async (req,res,nest) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
        newEmail: req.body.newEmail,
    };

    const sql = 'UPDATE user_account SET email = $1 WHERE email = $2 AND user_password = $3';
    const values = [userInfo.newEmail, userInfo.email, userInfo.password];

    const changeUserEmail = await  pool.query(sql,values);

    res.status(200).json({
        message: changeUserEmail
    });
});

// change name 
exports.changeName = catchAsync(async (req,res,next) => {
    const userInfo = {
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        id: req.body.id,
    };

    const sql = 'UPDATE user_account SET first_name = $1, last_name = $2 WHERE id = $3';
    const values = [userInfo.firstName, userInfo.lastName, userInfo.id];

    changeUserName = await pool.query(sql,values);

    res.status(200).json({
        message: changeUserName
    });

});

// updae profile picture 


