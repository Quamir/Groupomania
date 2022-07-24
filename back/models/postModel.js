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

    async showAllPost(offset){
        const sql = `
            SELECT 
                up.media,
                up.description_text,
                up.time_stamp,
                up.title_text,
                ua.first_name,
                ua.last_name,
                ua.profile_picture
            FROM user_post AS up
            INNER JOIN user_account AS ua 
            ON up.user_id = ua.id
            ORDER BY up.time_stamp DESC
            LIMIT 15
            OFFSET $1
        `;
        const values = [offset];
        const showAllUserPost = await pool.query(sql,values);
        return showAllUserPost;
    }

    async mostLikes(){
        const sql = `
            WITH most_likes (post_id) as
            (
                SELECT post_id, COUNT(post_id) as rep 
                FROM post_like 
                GROUP BY post_id 
                ORDER BY rep DESC
                LIMIT 10
            )
            SELECT 
                up.media,
                up.description_text,
                up.time_stamp,
                up.title_text,
                ua.first_name,
                ua.last_name,
                ua.profile_picture,
                ml.post_id
            FROM user_post AS up
            INNER JOIN most_likes AS ml
            ON up.id = ml.post_id
            INNER JOIN user_account AS ua
            ON up.user_id = ua.id 
            ORDER BY ml.rep DESC 
        `;

        const query = await pool.query(sql);
        return query.rows;
    }

    async profilePost(){
        const sql = `
            SELECT 
                up.media,
                up.description_text,
                up.time_stamp,
                up.title_text,
                ua.first_name,
                ua.last_name,
                ua.profile_picture
            FROM user_post AS up
            INNER JOIN user_account AS ua 
            ON up.user_id = ua.id 
            WHERE user_id = $1
            ORDER BY time_stamp DESC
        `;
        const values = [this.id];
        const query = await pool.query(sql,values);

        return query.rows;
    }

    async mostCommented(){
        const sql = `
            WITH most_comments (post_id) as
            (
                SELECT post_id, COUNT(post_id) as rep
                FROM post_comment 
                GROUP BY post_id 
                ORDER BY rep DESC 
                LIMIT 15
            )
            SELECT 
                up.media,
                up.description_text,
                up.time_stamp,
                up.title_text,
                ua.first_name,
                ua.last_name,
                ua.profile_picture,
                mc.post_id
            FROM user_post AS up
            INNER JOIN most_comments AS mc 
            ON up.id = mc.post_id
            INNER JOIN user_account AS ua 
            ON up.user_id = ua.id
            ORDER BY mc.rep DESC 
        `;

        const query = await pool.query(sql);
        return query.rows;
    }

    async mostInteractions(){
        const sql =`
            WITH new_ta AS 
                (
                    SELECT * FROM angry_emoji
                    UNION 
                    SELECT * FROM cry_emoji
                    UNION
                    SELECT * FROM heart_eye_emoji
                    UNION
                    SELECT * FROM laugh_emoji
                    UNION 
                    SELECT * FROM post_like
                    UNION
                    SELECT * FROM shock_emoji
                    UNION 
                    SELECT * FROM smile_emoji
                ),
            most_interactions (post_id) AS 
                (
                    SELECT post_id, COUNT(post_id) AS rep
                    FROM new_ta
                    GROUP BY post_id
                    ORDER BY rep DESC
                    LIMIT 3
                )
            SELECT 
                up.media, 
                up.description_text,
                up.time_stamp,
                up.title_text,
                ua.first_name,
                ua.last_name,
                ua.profile_picture,
                mi.post_id
            FROM user_post AS up
            INNER JOIN most_interactions AS mi
            ON up.id = mi.post_id
            INNER JOIN user_account AS ua 
            ON up.user_id = ua.id 
            ORDER BY mi.rep DESC 
        `

        const query = await pool.query(sql);
        return query.rows
    }

    async showSinglePost(){
        const sql = `
            SELECT 
                up.media,
                up.description_text,
                up.time_stamp,
                up.title_text,
                ua.first_name,
                ua.last_name,
                ua.profile_picture
            FROM user_post AS up
            INNER JOIN user_account AS ua 
            ON up.user_id = ua.id
            WHERE up.id = $1
        `;
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