const catchAsync  = require('../utils/catchAsync');
const User = require('../models/userModel');
const Media = require('../models/imageModel');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const media = new Media('./public/images/profile_pictures');
const upload = media.upload();

exports.uploadProfilePicture = upload.single('image');

// create an account
exports.createAccount = catchAsync(async (req,res,next) => {


    const user =  new User(
        ...[
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            ,
            ,
            ,
            `${req.protocol}://${req.get('host')}/images/profile_pictures/${req.file.filename}`
        ]
       
    );
   const createUser =  await user.createAccount();

    res.status(200).json({
        message: createUser
    });
});

// Log in 
exports.login = catchAsync(async (req,res,next) => {
    const user = new User(...[, ,req.body.email,req.body.password]);
    const loginUser = await user.login();

    res.status(200).json({
        message: loginUser
    });
});

// get user data
exports.userData = catchAsync(async(req,res,next) =>{
    token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, `${process.env.JWT_SECRET}`);
    jwtId = decoded.id

    const user = new User(...[, , , , , ,jwtId]);
    const getUserData = await user.getUserData();

    res.status(200).json({
        message: getUserData
    });
});

exports.getUerId = catchAsync(async(req,res,next) =>{
    const user = new User(...[, , , , , ,req.body.id]);
    const getUserId = await user.getUserId();

    res.status(200).json({
        message: getUserId
    });
});

// get people for people pannel
exports.getProfiles = catchAsync(async(req,res,next) =>{
    const user = new User();

    const profiles = await user.getProfiles(8); 

    res.status(200).json({
        message: profiles
    });
});

// gets a single profile 
exports.getProfile = catchAsync(async(req,res,next) =>{
    const user = new User(...[, , , , , , req.body.id,]);
    const profile = await user.getProfile();

    res.status(200).json({
        message: profile
    });
})

// delete account
exports.deleteAccount = catchAsync(async (req,res,next) => {
    const user = new User(...[, , req.body.email, req.body.password]);
    const deleteUserAccount = await user.deleteAccount();

    res.status(201).json({
        message: deleteUserAccount
    });
});

// change password 
exports.changePassword = catchAsync(async (req,res,next) =>{
    const user = new User(...[, ,req.body.email ,req.body.password,req.body.newPassword]);
    const changeUserPassword = await user.changePassword();

    res.status(200).json({
        message: changeUserPassword
    });
});

// change email
exports.changeEmail = catchAsync(async (req,res,nest) => {
    const user = new User(...[, ,req.body.email, req.body.password, ,req.body.newEmail]);
    const changeUserEmail = await user.changeEmail();
    
    res.status(200).json({
        message: changeUserEmail
    });
});

// change name 
exports.changeName = catchAsync(async (req,res,next) => {
    const user = new User(...[req.body.firstName, req.body.lastName, , , , ,req.body.id]);
    const changeUserName =  await user.changeName();
    res.status(200).json({
        message: changeUserName
    });

});

// change profile picture
exports.changeProfilePicture = catchAsync(async (req,res,next) =>{
    const user  = new User(...[
        ,
        ,
        , 
        , 
        , 
        ,
        req.body.id,
        `${req.protocol}://${req.get('host')}/images/profile_pictures/${req.file.filename}`
    ]);

    console.log(req.file.filename);
    const changePicture = await user.changeProfilePicture();

    res.status(200).json({
        message: changePicture
    });
});


