const pool = require('../database');
const Media = require('./imageModel');

class Post{
    constructor(id,userId,titleText,descriptionText,media){
        this.id = id;
        this.userId = userId;
        this.titleText = titleText;
        this.descriptionText = descriptionText;
        this.media = media;
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
        // find file that will be used in fs unlink
        const findFileLocation  = 'SELECT(media) FROM user_post WHERE id = $1';
        const getMediaLocation = await pool.query(findFileLocation, values);
        const fileLocation = getMediaLocation.rows[0].media;

        // console.log(getMediaLocation.rows[0].media);

        const deleteUserPost = await pool.query(sql,values);
        const media = new Media(fileLocation);
        const fileStatus = media.unLink('public/images/post_pictures');

        return [getMediaLocation.rows[0], deleteUserPost, fileStatus]
    }
}

module.exports = Post;