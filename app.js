const express = require('express');
const pool = require('./database');


const app = express();

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


s
app.listen(3000, () => {
    console.log("sever started on port 3000");
});



// https://www.postgresql.org/docs/current/ddl-constraints.html
// https://codehunter.cc/a/postgresql/mongoose-schema-vs-model
