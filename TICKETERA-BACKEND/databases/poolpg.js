const Pool = require('pg').Pool
const pool = new Pool({
    port: process.env.DB_PG_PORT,
    host: process.env.DB_PG_HOST,
    user: process.env.DB_PG_USER,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_NAME,
    max: 10
})

exports.getPool = pool;