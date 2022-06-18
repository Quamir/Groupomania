const express = require('express');
const pool = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {promisify} = require('util');

const signToken = id =>{
    return jwt.sign({id},`${process.env.JWT_SECRET}`,{
        expiresIn: "2h"
    });
}

class User{
    constructor(firstName,lastName,email,password,newPassword,newEmail,id){
        this.firstName = firstName;
        this.lastName = lastName
        this.email = email
        this.password = password
        this.newPassword = newPassword
        this.newEmail = newEmail
        this.id = id
    }

    async createAccount(){
        // checking db for existing email 
        const exist = 'SELECT EXISTS(SELECT email FROM user_account WHERE email = $1)';
        const existValue = [this.email];
        const existsQuery = await pool.query(exist, existValue);
        
        this.password = await bcrypt.hash(this.password, 12);
        

        if(existsQuery.rows[0].exists === true){
            return 'an account with this email adddresss has already been made';
        }else{
            const sql =  'INSERT INTO user_account(first_name, last_name,email, user_password) VALUES($1,$2,$3,$4) RETURNING*';
            const values = [this.firstName, this.lastName, this.email, this.password];
            const newAccount = await pool.query(sql, values);
            const token = signToken(newAccount.rows[0].id);
            return [newAccount.rows[0],token]; 
        }
    }

    async login(){
        //  gets user id 
        const id = 'SELECT id FROM user_account WHERE email = $1 ';
        const idValue = [this.email];
        const idQuery = await pool.query(id, idValue);

        const token = signToken(idQuery.rows[0].id);

        const sql = 'SELECT email, user_password, id FROM user_account WHERE email = $1 AND user_password = $2 ';
        const values = [this.email, this.password];
        const login = await pool.query(sql,values);
        return {token, login}
    }

    async deleteAccount(){
        const sql = 'DELETE FROM user_account WHERE email = $1 AND user_password = $2';
        const values = [this.email, this.password];
        const deleteUserAccount = await pool.query(sql,values);
        return deleteUserAccount;
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