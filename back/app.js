const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

// route paths
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const reactionsRouter = require('./routes/reactionsRouter');

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

// main routes
app.use('/api/user',userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment',commentRouter);
app.use('/api/reaction',reactionsRouter);

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
