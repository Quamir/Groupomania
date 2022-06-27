const pool = require("../database");
const catchAsync = require("../utils/catchAsync");


// if liking a post have id null 
// if unliking a post provide a id 
exports.reaction = (insertSql,deleteSql) => catchAsync(async(req,res,next) =>{
    const react = {
        id: req.body.id,
        reactOrunReact: req.body.reactOrunReact,
        postId: req.body.postId,
        userId: req.body.userId
    }

    let sql

    if(react.reactOrunReact === 1){
        sql = insertSql
        values = [react.postId,react.userId];
    }else{
        sql = deleteSql
        values = [react.id];
    }

    const reactToPost = await pool.query(sql,values);

    res.status(200).json({
        message: reactToPost.rows
    });
});

