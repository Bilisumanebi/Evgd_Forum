const mysql2 = require('mysql2')
const dbconnection = mysql2.createPool({
      user: process.env.USER,
      host:"localhost",
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      connectionLimit: 10,
})



// dbconnection.execute("select 'test'  ", (err, results) => {
//       if (err) {
//             console.log(err)
//       }
//       else {
//             console.log(results)
//       }
// })

module.exports = dbconnection.promise()