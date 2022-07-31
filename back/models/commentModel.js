const pool = require('../database');

class Comment{
    constructor(postId,userId,text,id){
        this.postId = postId,
        this.userId = userId,
        this.text = text
        this.id = id
    }

    async getAllComments(){
        const sql = `
            SELECT 
                pc.comment_text,
                pc.time_stamp,
                pc.id,
                pc.user_id,
                ua.first_name,
                ua.last_name,
                ua.profile_picture
            FROM post_comment AS pc 
            INNER JOIN user_account AS ua 
            ON pc.user_id = ua.id 
            WHERE post_id = $1
            ORDER BY time_stamp
        `;
        const value = [this.id];
        const allComments = await pool.query(sql, value);

        return allComments.rows
    }

    async createComment(){
        const sql = 'INSERT INTO post_comment(post_id,user_id,comment_text) VALUES($1,$2,$3) RETURNING*';
        const values = [this.postId,this.userId,this.text];
        const createUserComment = await pool.query(sql,values);

        return createUserComment.rows
    }

    async editComment(){
        const sql = 'UPDATE post_comment SET comment_text = $1, time_stamp = CURRENT_TIMESTAMP WHERE id = $2 RETURNING*';
        const values = [this.text, this.id];
        const editUserComment = await pool.query(sql,values);

        return editUserComment.rows;
    }

    async deleteComment(){
        const sql = 'DELETE FROM post_comment WHERE id = $1';
        const values = [this.id];
        const deleteUserComment = await pool.query(sql,values);

        return deleteUserComment.command
    }
}

module.exports = Comment;