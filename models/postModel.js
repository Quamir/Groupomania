const pool = require('../database');

class Post{
    constructor(id,userId,titleText,descriptionText,media){
        this.id = id;
        this.userId = userId;
        this.titleText = titleText;
        this.descriptionText = descriptionText;
        this.media = null;
    }

    async showAllPost(){
        const sql = 'SELECT * FROM user_post';
        const showAllUserPost = await pool.query(sql);
        return showAllUserPost;
    }

    async showSinglePost(){
        const sql = 'SELECT * FROM user_post WHERE id = $1';
        const values = [this.id];
        const showSingleUserPost = await pool.query(sql,values);
        return showSingleUserPost.rows;
    }

    async createPost(){
        const sql = 'INSERT INTO user_post(user_id, title_text, description_text, media) VALUES($1,$2,$3,$4) RETURNING*';
        const values = [this.userId, this.titleText, this.descriptionText, this.media];
        const createUserPost = await pool.query(sql,values);
        return createUserPost.rows;
    }

    async editPost(){
        const sql = 'UPDATE user_post SET title_text = $1, description_text = $2  WHERE id = $3 RETURNING*';
        const values = [this.titleText, this.descriptionText, this.id];
        const editUserPost = await pool.query(sql,values);
        return editUserPost.rows
    }

    async deletePost(){
        const sql = 'DELETE FROM user_post WHERE id = $1 RETURNING*';
        const values= [this.id];
        const deleteUserPost = await pool.query(sql,values);
        return deleteUserPost.rows
    }
}

module.exports = Post;