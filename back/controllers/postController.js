const catchAsync  = require('../utils/catchAsync');
const Post = require('../models/postModel');
const Media = require('../models/imageModel');

const media = new Media('./public/images/post_pictures');
const upload = media.upload();
exports.uploadPostMedia = upload.single('image');

// show All post 
exports.showAllPost = catchAsync(async (req,res,next) =>{
    const post = new Post(...[,]);
    const showPost = await post.showAllPost();

    res.status(200).json({
        message: showPost
    });
});

// show single post 
exports.showSinglePost = catchAsync(async (req,res,next) =>{
    const post = new Post(req.body.id);
    const showPost = await post.showSinglePost();

    res.status(200).json({
        message: showPost
    });
});

// create post 
exports.createPost = catchAsync(async (req,res,next) =>{
    // multer 
    const post = new Post(
        ...[
            ,
            req.body.userId,
            req.body.titleText,
            req.body.descriptionText,
            `${req.protocol}://${req.get('host')}/public/images/post_pictures/${req.file.filename}`
        ]
      
    );
    const createUserPost = await post.createPost();

    res.status(200).json({
        message: createUserPost
    });
});

// edit post 
exports.editPost = catchAsync(async (req,res,next) =>{
    const post = new Post(
        ...[
            req.body.id
            , 
            req.body.titleText,
            req.body.descriptionText,
            req.body.media
        ]
    );
    const editUserPost = await post.editPost();

    res.status(200).json({
        message: editUserPost
    });
});

// delete post
exports.deletePost = catchAsync(async (req,res,next) => {
    const post = new Post(...[req.body.id, , , ,]);
    const deleteUserPost = await post.deletePost();

    console.log(req.body.id);
  
    res.status(200).json({
        message: deleteUserPost
    })
});
