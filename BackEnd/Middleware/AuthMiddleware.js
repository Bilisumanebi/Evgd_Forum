
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

async function AuthMiddleware(req, res, next) {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
      }
      const token = authHeader.split(" ")[1];
      // console.log(token);
      // console.log(authHeader);
      
      

      try {
            const {username, userid} = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { username, userid };
            next();
      } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
      }

}

module.exports =  AuthMiddleware 