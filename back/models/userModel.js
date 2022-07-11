const express = require('express');
const pool = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const AppError = require('../utils/appError');
const Media = require('./imageModel');

const signToken = id =>{
    return jwt.sign({id},`${process.env.JWT_SECRET}`,{
        expiresIn: "2h"
    });
}

class User{
    constructor(firstName,lastName,email,password,newPassword,newEmail,id,profilePicture){
        this.firstName = firstName;
        this.lastName = lastName
        this.email = email
        this.password = password
        this.newPassword = newPassword
        this.newEmail = newEmail
        this.id = id
        this.profilePicture = profilePicture
    }

    async createAccount(){
        // checking db for existing email 
        const exist = 'SELECT EXISTS(SELECT email FROM user_account WHERE email = $1)';
        const existValue = [this.email];
        const existsQuery = await pool.query(exist, existValue);
        
        this.password = await bcrypt.hash(this.password, 12);
        

        if(existsQuery.rows[0].exists === true){
            return {message: 'an account with this email adddresss has already been made'}
        }else{
            const sql =  'INSERT INTO user_account(first_name, last_name,email, user_password, profile_picture) VALUES($1,$2,$3,$4,$5) RETURNING*';
            const values = [this.firstName, this.lastName, this.email, this.password, this.profilePicture];
            const newAccount = await pool.query(sql, values);
            const token = signToken(newAccount.rows[0].id);
            return [newAccount.rows[0],token]; 
        }
    }

    async login(){
        //  gets user id 
        const id = 'SELECT id, user_password FROM user_account WHERE email = $1';
        const email = [this.email];
        const idQuery = await pool.query(id, email);
        const token = signToken(idQuery.rows[0].id);
        const userPassword = idQuery.rows[0].user_password

        // compare password to hash
        const compare = await bcrypt.compare(this.password,userPassword);
        if(compare === true){
            return {token}
        }else{
            return  (new AppError('wrong username or password',404))
        }
    }

    async getUserData(){
        const sql = 'SELECT * FROM user_account WHERE id = $1';
        const value = [this.id];
        const query = await pool.query(sql, value);

     
        return query.rows[0];
    }

    async getProfiles(limit){
        const sql = 'SELECT id, first_name, last_name, profile_picture FROM user_account ORDER BY RANDOM() LIMIT $1';
        const values = [limit]
        const query = await pool.query(sql, values);
        
        return query.rows;
    }

    async getProfile(){
        const sql = 'SELECT first_name, last_name, profile_picture FROM user_account WHERE id = $1';
        const values = [this.id];
        const query = await pool.query(sql, values);
        
        console.log(query);
        if(query.rowCount === 0){
            return  (new AppError('can\'t find user ',404));
        }else{
            return query.rows[0];
        }
    }

    async deleteAccount(){
        //  checks if user exist 
        const exist = 'SELECT EXISTS(SELECT email, user_password FROM user_account WHERE email = $1)';
        const value = [this.email];
        const existsQuery = await pool.query(exist, value);
        //  checks if a profile picture exists 
        const ProfilePictureExists = 'SELECT EXISTS(SELECT profile_picture FROM user_account WHERE email = $1)';
        const profilePictureQuery = await pool.query(ProfilePictureExists, value);

        if(existsQuery.rows[0].exists === true){
            // check hashed password
            const hashPassWordQuery = 'SELECT user_password FROM user_account WHERE email = $1'
            const hashPassWordValues = [this.email];
            const hashPassword = await pool.query(hashPassWordQuery, hashPassWordValues);
            const compare = await bcrypt.compare(this.password,hashPassword.rows[0].user_password);


            if(profilePictureQuery.rows[0].exists === true){
                // find file location of profile picture
                const findProfilePicture = 'SELECT profile_picture FROM user_account WHERE email = $1';
                const queryForProfilePicture = await pool.query(findProfilePicture,value);
                const getProfilePicture = queryForProfilePicture.rows[0].profile_picture
            
                // delete profile picture 
                const media =  new Media(getProfilePicture);
                const fileStatus = media.unLink('public/images/profile_pictures');
            }

            if(compare === true){
                //  delete account 
                const sql = 'DELETE FROM user_account WHERE email = $1';
                const deleteUserAccount = await pool.query(sql,value);
            }


        } else{
            return {notice: 'user account does not exist'}
        }

        return {notice: 'user profile has delted'}
    }

    async changePassword(){
        const sql = 'UPDATE user_account SET user_password = $1 WHERE email = $2 AND user_password = $3';
        const values = [this.newPassword, this.email, this.password];
        const changeUserPassword = await pool.query(sql,values);
        return changeUserPassword;
    }

    async changeEmail(){
        const sql = 'UPDATE user_account SET email = $1 WHERE email = $2 AND user_password = $3';
        const values = [this.newEmail, this.email, this.password];
        const changeUserEmail = await  pool.query(sql,values);
        return changeUserEmail;
    }

    async changeName(){
        const sql = 'UPDATE user_account SET first_name = $1, last_name = $2 WHERE id = $3';
        const values = [this.firstName, this.lastName, this.id];
        const changeUserName = await pool.query(sql,values);
        return changeUserName;
    }


}

module.exports = User;