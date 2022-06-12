const express = require('express');
const path = require('path');

const app = express();

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

// prevent CORS issues 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/post', postRouter);

// error handling middleware 
app.use((err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        operational: err.isOperational,
        stacktrace: err.stack
    });
});



module.exports = app;

// https://www.postgresql.org/docs/current/ddl-constraints.html
// https://codehunter.cc/a/postgresql/mongoose-schema-vs-model
