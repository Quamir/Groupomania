const catchAsync  = require('../utils/catchAsync');
const User = require('../models/userModel');


// create an account
exports.createAccount = catchAsync(async (req,res,next) => {
    const user =  new User(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    );
   const createUser =  await user.createAccount();

    res.status(200).json({
        message: createUser[0],
        token: createUser[1]
    });
});

// Log in 
exports.login = catchAsync(async (req,res,next) => {
    const user = new User(...[, ,req.body.email,req.body.password]);
    const loginUser = await user.login();

    res.status(200).json({
        message: loginUser.login,
        token: loginUser.token
    });
});

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
    console.log(req.body);
    res.status(200).json({
        message: changeUserName
    });

});

// updae profile picture 


