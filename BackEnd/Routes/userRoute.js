const express = require('express');
const router = express.Router();

// auth middleware
const AuthMiddleware = require('../Middleware/AuthMiddleware')



// user controller
const { register, login, checkUser } = require('../Controller/userController')


// register route
router.post("/register", register)

// login route
router.post("/login", login)  
      

// check if user is authenticated
router.get("/check", AuthMiddleware, checkUser)


module.exports = router;