const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "Naruto",
    host: "localhost",
    port: "5432",
    database: "groupomania"
});

module.exports = pool;