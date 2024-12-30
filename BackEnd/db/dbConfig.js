const mysql2 = require('mysql2')
const dbconnection = mysql2.createPool({
      user: process.env.USER,
      // host: process.env.HOST,
      host: 'localhost',
   
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      connectionLimit: 10,
})



module.exports = dbconnection.promise()