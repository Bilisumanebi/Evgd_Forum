
// db connection
const dbConnection = require('../db/dbConfig');
const bcrypt = require('bcrypt')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')






async function register(req, res){
      const {username, firstname, lastname, email, password} = req.body;
      if (!username || !firstname || !lastname || !email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are required"})
      }
      try {
            const [existingUser] = await dbConnection.query("select username, userid from users where username = ? or email = ?", [username, email])
            if (existingUser.length > 0){
                  return res.status(StatusCodes.BAD_REQUEST).json({message: "User already exists"})}

            if (password.length < 6){
                  return res.status(StatusCodes.BAD_REQUEST).json({message: "Password must be at least 6 characters long"})}   
                  
                  // hash password
                  const salt = await bcrypt.genSalt(10)

                  const hashedPassword = await bcrypt.hash(password, salt)

            await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)", [username, firstname, lastname, email, hashedPassword])
            return res.status(StatusCodes.CREATED).json({message: "User created successfully"})


      } catch (error) {
            console.log(error.message)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error, try agian later"})
            
      }
}


async function login(req, res){
      const { email, password } = req.body;
      
      if (!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "All fields are required"})
      }
      try {
            const [existingUser] = await dbConnection.query("select username, userid, password from users where email = ? ", [email])
            if (existingUser.length === 0){
                  return res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid credentials"})}

                  // check password
                  const isMatch = await bcrypt.compare(password, existingUser[0].password)
                  if (!isMatch){
                        return res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid credentials"})}

                        const username = existingUser[0].username
                        const userid = existingUser[0].userid
                        const token = jwt.sign({userid, username}, process.env.JWT_SECRET, {expiresIn: "1d"})

                        return res.status(StatusCodes.OK).json({message: "Login successful", token, username})

      } catch (error) {
            console.log(error.message)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error, try agian later"})
            
      }
}
async function checkUser(req, res){
      const username = req.user.username
      const userid = req.user.userid
      res.status(StatusCodes.OK).json({message: "User is authenticated", username, userid})
      
}







module.exports = {register, login, checkUser}