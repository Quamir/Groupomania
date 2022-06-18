const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const pool = require('../database');


exports.protect = catchAsync(async (req, res, next) =>{
    let token 

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access', 403));
    }

    // validate token 
    const decoded = await promisify(jwt.verify)(token, `${process.env.JWT_SECRET}`);
    req.body.id = decoded.id
    // check if user exists
    const sql =  'SELECT EXISTS(SELECT * FROM user_account WHERE id = $1)';
    const values = [decoded.id];
    const userExists = await pool.query(sql, values);
    
    if(userExists.rows[0].exists !== true){
        return next(new AppError('The user of this token no longer exist',401));
    }
    
    next();
});