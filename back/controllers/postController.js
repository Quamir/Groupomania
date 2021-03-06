const catchAsync  = require('../utils/catchAsync');
const Post = require('../models/postModel');
const Media = require('../models/imageModel');

const media = new Media('./public/images/post_pictures');
const upload = media.upload();
exports.uploadPostMedia = upload.single('image');

// show All post 
exports.showAllPost = catchAsync(async (req,res,next) =>{
    const post = new Post(...[,]);
    const showPost = await post.showAllPost(req.body.offset);

    res.status(200).json({
        message: showPost.rows
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

// show most liked post
exports.mostLikePost = catchAsync(async (req,res,next) =>{
    const posts = new Post();
    const mostLike = await posts.mostLikes();

    res.status(200).json({
        message: mostLike
    })
});

// show most commented post 
exports.mostCommentedPost = catchAsync(async(req,res,next) =>{
    const posts = new Post();
    const mostedCommented = await posts.mostCommented();

    res.status(200).json({
        message: mostedCommented
    });
});

// get the top post 
exports.mostInteractions = catchAsync(async (req,res,next) =>{
    const posts = new Post();
    const mostInteracts = await posts.mostInteractions();

    res.status(200).json({
        message: mostInteracts
    });
});

// get profile post 
exports.profilePost = catchAsync(async (req,res,next) =>{
    const posts = new Post(req.body.id);
    const profilePost = await posts.profilePost();

    res.status(200).json({
        message: profilePost
    });
})

// create post 
exports.createPost = catchAsync(async (req,res,next) =>{
    // multer 
    const post = new Post(
        ...[
            ,
            req.body.userId,
            req.body.titleText,
            req.body.descriptionText,
            `${req.protocol}://${req.get('host')}/images/post_pictures/${req.file.filename}`
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
