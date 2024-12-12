const express = require("express");
const router = express.Router();

// auth middleware
const AuthMiddleware = require("../Middleware/AuthMiddleware");

router.get("/all-questions", AuthMiddleware, (req, res) => {
  res.json({ message: "All questions" });
});


module.exports = router;