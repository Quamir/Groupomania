const express = require('express');
const pool = require('./database');

// create an account
app.post("/account", async (req,res) =>{
    try{
        const data = req.body;
        const newData = data.data;
      
        const newAccount = await pool.query(
            "INSERT INTO test (data) VALUES($1) RETURNING *", 
            [newData]
        );

        res.status(200).json({
            message: newData
        });

    }catch(err){
        console.error(err.message)
    }
});

