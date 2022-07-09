const fs = require('fs');
const path = require('path');
const pool = require('../database');
const factory = require('../controllers/handlerFactory');
const bcrypt = require('bcrypt');
const { query } = require('express');

class UserGenContent{
    constructor(id,media,des,title){
        this.id = id,
        this.des = des,
        this.title = title,
        this.media = media
    }

    async generateAccounts(){
        const userArray = [
            {
                firstName: 'Albin',
                lastName: 'Pierre'
            },
            {
                firstName: 'Alden',
                lastName: 'Hale'
            },
            {
                firstName: 'Cade',
                lastName: 'Weldon'
            },
            {
                firstName: 'Daxton',
                lastName: 'Indiana'
            },
            {
                firstName: 'Hudson',
                lastName: 'Jaron'
            },
            {
                firstName: 'Jez',
                lastName: 'Jerald'
            },
            {
                firstName: 'Joanna',
                lastName: 'Noelene'
            },
            {
                firstName: 'Laurencia',
                lastName: 'Felicity'
            },
            {
                firstName: 'Lorra',
                lastName: 'Gertie'
            },
            {
                firstName: 'Mack',
                lastName: 'Casimir'
            },
            {
                firstName: 'Marissa',
                lastName: 'Deonne'
            },
            {
                firstName: 'Ned',
                lastName: 'Thorburn'
            },
            {
                firstName: 'Petunia',
                lastName: 'Ariel'
            },
            {
                firstName: 'Rex',
                lastName: 'Benton'
            },
            {
                firstName: 'Roscoe',
                lastName: 'Kendall'
            },
            {
                firstName: 'Seth',
                lastName: 'Silas'
            },
            {
                firstName: 'Shaun',
                lastName: 'Aydan'
            },
            {
                firstName: 'shayne',
                lastName: 'Campbell'
            },
            {
                firstName: 'Steve',
                lastName: 'Roman'
            },
            {
                firstName: 'Sydney',
                lastName: 'Virgee'
            },
            {
                firstName: 'Tisha',
                lastName: 'Lorri'
            },
            {
                firstName: 'Toni',
                lastName: 'Isbel',
            },
            {
                firstName: 'Tyson',
                lastName: 'Bryant'
            }
        ];

        userArray.forEach(person =>{
            genUser(person.firstName, person.lastName);
        });
    }

    async generateUserPosts(){
        for(let i = 0; i < 50; i++){
            this.id = getRandomIntInclusive(1,23);
            this.title = ranTitle();
            this.des = ranDescription();
            this.media = getRanImg();

            const sql = 'INSERT INTO user_post(user_id, title_text, description_text, media) VALUES($1,$2,$3,$4) RETURNING*';
            const values = [this.id, this.title, this.des, this.media];
            const genPost = await pool.query(sql, values);
            console.log(genPost.rows);
        }
    }

    async generateUserComments(){

        for(let i = 0; i < 150; i++){
            const sql = 'SELECT * FROM user_post';
            const allPost = await pool.query(sql);
            const postCount = allPost.rowCount;
    
            this.postId = allPost.rows[getRandomIntInclusive(0 , postCount - 1)];
            this.userId = getRandomIntInclusive(1,23);
            this.text = genRanComment();

            const insert = 'INSERT INTO post_comment(post_id,user_id,comment_text) VALUES($1,$2,$3) RETURNING*';
            const values = [this.postId.id,this.userId,this.text];
            const query = await pool.query(insert, values);
            
            console.log(query);
        }
    }

    async generateUserReactions(){
        // check if user already left a like
        const like = 'SELECT * FROM post_like WHERE user_id = $1 AND post_id = $2';
        const angryEmoji = 'SELECT * FROM angry_emoji WHERE user_id = $1 AND post_id = $2';
        const cryEmoji = 'SELECT * FROM cry_emoji WHERE user_id = $1 AND post_id = $2';
        const heartEyeEmoji = 'SELECT * FROM heart_eye_emoji WHERE user_id = $1 AND post_id = $2';
        const laughEmoji = 'SELECT * FROM laugh_emoji WHERE user_id = $1 AND post_id = $2';
        const shockEmoji = 'SELECT * FROM shock_emoji WHERE user_id = $1 AND post_id = $2';
        const smileEmoji = 'SELECT * FROM smile_emoji WHERE user_id = $1 AND post_id = $2';

        // Insert into database
        const insertLike = 'INSERT INTO post_like(post_id, user_id) VALUES($1,$2) RETURNING*';
        const addAngryEmoji = 'INSERT INTO angry_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
        const addCryEmoji = 'INSERT INTO cry_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
        const addHeartEyeEmoji = 'INSERT INTO heart_eye_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
        const addLaughEmoji = 'INSERT INTO laugh_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
        const addShockEmoji = 'INSERT INTO shock_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
        const addSmileEmoji = 'INSERT INTO smile_emoji(post_id, user_id) VALUES($1,$2) RETURNING*';
        

        for(let i = 0; i < 160; i++){

            // check amount of post 
            const sql = 'SELECT * FROM user_post';
            const allPost = await pool.query(sql);
            const postCount = allPost.rowCount;

            this.userId = getRandomIntInclusive(1,23);
            this.postId = allPost.rows[getRandomIntInclusive(0 , postCount - 1)];

            console.log(this.postId.id);
            console.log(this.userId);


            const reactArray = [
                'like',
                'angry',
                'cry',
                'hearteye',
                'laugh',
                'shock',
                'smile'
            ]
    
            const ranReact = reactArray[getRandomIntInclusive(0,reactArray.length - 1)];
            console.log(ranReact);

            switch(ranReact){
                case 'like':
                    factory.userGenReact(like, insertLike, this.userId, this.postId);
                break;
                case 'angry':
                    factory.userGenReact(angryEmoji, addAngryEmoji, this.userId, this.postId);
                break;
                case 'cry':
                    factory.userGenReact(cryEmoji, addCryEmoji, this.userId, this.postId);
                break;
                case 'hearteye':
                    factory.userGenReact(heartEyeEmoji, addHeartEyeEmoji, this.userId, this.postId);
                break;
                case 'laugh':
                    factory.userGenReact(laughEmoji, addLaughEmoji, this.userId, this.postId);
                break;
                case 'shock':
                    factory.userGenReact(shockEmoji, addShockEmoji, this.userId, this.postId);
                break;
                case 'smile':
                    factory.userGenReact(smileEmoji, addSmileEmoji, this.userId, this.postId);
                break;
            }
        }
    }
}


const titleArray = [
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
   'Lorem ipsum dolor sit amet, consectetur adipiscing',
   'Lorem ipsum dolor sit amet, consectetur',
   'Lorem ipsum dolor sit amet',
   'Lorem ipsum dolor sit',
]

const desArray = [
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque. Eu consequat ac felis donec et odio. In arcu cursus euismod quis viverra. Auctor urna nunc id cursus metus aliquam eleifend. Ipsum suspendisse ultrices gravida dictum.',
    'Ultrices eros in cursus turpis massa tincidunt dui ut. Quis vel eros donec ac odio tempor. Libero nunc consequat interdum varius sit. Rhoncus urna neque viverra justo nec ultrices dui. Varius duis at consectetur lorem. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Pharetra convallis posuere morbi leo. Maecenas pharetra convallis posuere morbi leo urna molestie at.',
    'Nullam vehicula ipsum a arcu. In tellus integer feugiat scelerisque varius morbi enim nunc. In hac habitasse platea dictumst vestibulum. In hac habitasse platea dictumst. Amet nisl purus in mollis nunc sed id semper risus. Adipiscing diam donec adipiscing tristique risus. Mattis pellentesque id nibh tortor id. Porta nibh venenatis cras sed felis eget velit. In tellus integer feugiat scelerisque. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Purus in mollis nunc sed. Odio morbi quis commodo odio aenean. ',
    'Nisi quis eleifend quam adipiscing vitae proin sagittis. Sed velit dignissim sodales ut eu. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Netus et malesuada fames ac turpis egestas. Integer feugiat scelerisque varius morbi enim nunc. Ultrices eros in cursus turpis massa tincidunt dui. At tempor commodo ullamcorper a lacus vestibulum sed. In dictum non consectetur a erat nam at lectus. In hendrerit gravida rutrum quisque non tellus orci ac.',
    'Urna neque viverra justo nec ultrices dui sapien eget mi. Nulla facilisi morbi tempus iaculis. Eget egestas purus viverra accumsan in nisl nisi. Ac auctor augue mauris augue neque gravida. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Dignissim cras tincidunt lobortis feugiat vivamus at. Sit amet purus gravida quis.',
    'Eget mauris pharetra et ultrices neque. Condimentum mattis pellentesque id nibh tortor id. Eu facilisis sed odio morbi quis commodo odio aenean sed. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Cras sed felis eget velit aliquet sagittis id consectetur.',
    'iverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Nulla aliquet enim tortor at auctor. Dui nunc mattis enim ut tellus. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Massa vitae tortor condimentum lacinia quis. In nisl nisi scelerisque eu',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices sagittis orci a scelerisque purus semper eget duis. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue.',
    'Mauris cursus mattis molestie a iaculis at erat. Urna duis convallis convallis tellus id interdum velit. Neque gravida in fermentum et sollicitudin ac. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Sapien pellentesque habitant morbi tristique senectus et netus. Ultricies integer quis auctor elit sed vulputate mi sit amet. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Volutpat maecenas volutpat blandit aliquam etiam.',
    'Mauris cursus mattis molestie a iaculis at erat. Urna duis convallis convallis tellus id interdum velit. Neque gravida in fermentum et sollicitudin ac. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Sapien pellentesque habitant morbi tristique senectus et netus.'

];

const commentArray = [
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque. Eu consequat ac felis donec et odio. In arcu cursus euismod quis viverra. Auctor urna nunc id cursus metus aliquam eleifend. Ipsum suspendisse ultrices gravida dictum.',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque. Eu consequat ac felis donec et odio. In arcu cursus euismod quis viverra. Auctor urna nunc id cursus metus aliquam eleifend. Ipsum suspendisse ultrices ',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque. Eu consequat ac felis donec et odio. In arcu cursus euismod quis viverra. Auctor urna nunc id cursus metus aliquam eleifend. Ipsum',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque. Eu consequat ac felis donec et odio. In arcu cursus euismod quis viverra. Auctor urna nunc id cursus metus',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque. Eu consequat ac felis donec et odio. In arcu cursus',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida neque. Eu consequat ac felis donec et odio.',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum enim facilisis gravida',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque habitant morbi tristique senectus. Aliquet bibendum',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit. Pellentesque',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper. Tempus egestas sed sed risus pretium quam vulputate. Porttitor massa',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis ullamcorper velit sed ullamcorper.',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdiet dui accumsan. Vestibulum mattis',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id. Adipiscing commodo elit at imperdie',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis. Vulputate ut pharetra sit amet aliquam id.',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi quis.',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi ',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod ',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'sed do eiusmod tempor incididunt ut labore et dolore magna',
    'sed do eiusmod tempor incididunt ut labore et dolore',
    'sed do eiusmod tempor incididunt ut labore et',
    'sed do eiusmod tempor incididunt ut',
    'sed do eiusmod tempor incididunt',
    'sed do eiusmod tempor',
    'sed do eiusmod',
    'sed do',
    'sed',
]


function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}
// post title_text
function ranTitle(){
    return titleArray[getRandomIntInclusive(0,4)];
}
// post description_text
function ranDescription(){
    return desArray[getRandomIntInclusive(0,9)];
}
// post Media 
function getRanImg(){
    const dir =  fs.readdirSync(path.join(__dirname, '..', 'public', 'images', 'post_pictures'));
    const imgName = dir[getRandomIntInclusive(0,30)];
    const imgPath = `http://localhost:3000/images/post_pictures/${imgName}`;

    return imgPath;
}

// Comment text
function genRanComment(){
    return commentArray[getRandomIntInclusive(0, commentArray.length)];
}


async function genUser(firstName, lastName){
    const name = firstName;
    const secondName = lastName;
    let emailEnd = '';

    const ranEMail = getRandomIntInclusive(1,2);

    if(ranEMail < 2){
        emailEnd = '@yahoo.com';
    }else{
        emailEnd = '@gmail.com';
    }

    function titleCase(string){
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    const email = lastName + emailEnd;
    const password = titleCase(lastName) + '12345';
    const passwordHashed = await bcrypt.hash(password, 12);

    const profilePicture = `http://localhost:3000/images/profile_pictures/${name}_${secondName}.jpg`;

    const user = {
        firstName: name,
        lastName: secondName,
        email: email,
        pwd:  passwordHashed,
        profilePicture: profilePicture
    }

    const sql = 'INSERT INTO user_account(first_name, last_name, email, user_password, profile_picture) VALUES ($1,$2,$3,$4,$5) RETURNING*';
    const values = [user.firstName, user.lastName, user.email, user.pwd, user.profilePicture];
    const query = await pool.query(sql,values);

    console.log(query.rows[0]);
}   

const userContent = new UserGenContent

userContent.generateAccounts();

// generate user post first 
// userContent.generateUserPosts();
// than user reactions 
// userContent.generateUserReactions();
// than user comments 
// userContent.generateUserComments();


// reactions SELECT statments
// SELECT * FROM post_like
// SELECT * FROM angry_emoji
// SELECT * FROM cry_emoji
// SELECT * FROM heart_eye_emoji
// SELECT * FROM laugh_emoji
// SELECT * FROM shock_emoji
// SELECT * FROM shock_emoji
// SELECT * FROM smile_emoji



