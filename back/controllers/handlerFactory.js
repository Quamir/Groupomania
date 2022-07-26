const pool = require("../database");
const catchAsync = require("../utils/catchAsync");


// if liking a post have id null 
// if unliking a post provide a id 
exports.reaction = (check,insertSql,deleteSql) => catchAsync(async(req,res,next) =>{
    const react = {
        postId: req.body.postId,
        userId: req.body.userId
    }

    let sql
    let message;
    let values;
    let reactToPost;
    const dbCheck = check;
    const dbCheckValues = [req.body.userId];
    const dbCheckQuery = await pool.query(dbCheck, dbCheckValues);

    console.log(dbCheckQuery.rowCount);

    if(dbCheckQuery.rowCount >= 1){
        sql = deleteSql;
        values = [react.userId];
        reactToPost = await pool.query(sql,values);
        message = 'user removes thier reaction to this post'
    }else{
        sql = insertSql;
        values = [react.postId,react.userId];
        reactToPost = await pool.query(sql,values);
        message = 'user reacts to this post '
    }

    res.status(200).json({
        message: message
    });
});


exports.userGenReact = async (check ,insertSql ,userId ,postId ) => {

    const values = [userId, postId.id];
    const dbCheck = await pool.query(check, values);

    console.log(dbCheck.rowCount);


    if(dbCheck.rowCount === 0){
        const sql = insertSql;
        const insertValues = [postId.id, userId];
        const userReact = await pool.query(sql,insertValues);
        console.log(userReact.rows);
    }else{
        console.log('there is a problem');
    }

};


