require('dotenv').config()
const express = require('express');
const app = express();
const mysql2 = require('mysql2')
const cors = require('cors')

app.use(cors())

const port = 4001;


// db connection
const dbconnection = require('./db/dbConfig')


// user route middleware
const userRoute = require('./Routes/userRoute')

// question route middleware
const questionsRoute = require('./Routes/questionRoute')

// auth middleware
const AuthMiddleware = require('./Middleware/AuthMiddleware')

// json middleware
app.use(express.json())


// user route middleware
app.use("/api/users", userRoute)

//  question route middleware
app.use("/api/questions", AuthMiddleware,  questionsRoute)

// answer route middleware

async function start() {
      try {
            const result = await dbconnection.execute("select 'test'  ")
            app.listen(port)
            console.log("database connected");
            
            console.log(`Server is running on port ${port}`)
            // console.log(result)

      } catch (error) {
            console.log(error.message)
      }
}

start()



