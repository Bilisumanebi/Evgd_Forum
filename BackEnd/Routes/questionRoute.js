const express = require('express');
const router = express.Router();
const dbConnection = require('../db/dbConfig');
const {v4: uuidv4} = require('uuid');
const { StatusCodes } = require('http-status-codes');



// get a sigle question
const getSingleQuestion = async (req, res) => {
      try {
            const { questionid } = req.params;

      // validate input
      if (!questionid){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Question ID is required."})
      }
      const sql = "SELECT questions.questionid, questions.title, questions.description, users.username FROM questions JOIN users ON questions.userid = users.userid WHERE questions.questionid = ?";
      const [result] = await dbConnection.query(sql, [questionid]);

      // check if question exists
      if (!result || result.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({message: "Question not found."})
      }
      // return question the first matching question
      return res.status(StatusCodes.OK).json({message: "Question retrieved successfully.", question: result[0]}) 

      } catch (error) {
            console.log("Error fetching question:", error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error, try again later."})
      }
    
}

// get all questions
const getAllQuestions = async (req, res) => {
      const sql = "SELECT questions.questionid, questions.title, questions.description, users.username FROM questions JOIN users ON questions.userid = users.userid";
      try {
            const result = await dbConnection.query(sql);
            if (!result || result.length === 0){
                  return res.status(StatusCodes.NOT_FOUND).json({message: "No questions found"})
            }
            return res.status(StatusCodes.OK).json({ message: "Questions retrieved successfully.", questions: result[0]})
      } catch (error) {
            console.log("Error fetching questions:", error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error, try again later."})
      }
}

// submit a question
const postQuestion = async (req, res) => {
      try {
            const {title, desc, userid } = req.body;

            // validate input
            if (!title || !desc){
                  return res.status(StatusCodes.BAD_REQUEST).json({message: "Title and description are required."})
            }
            if (!userid){
                  return res.status(StatusCodes.UNAUTHORIZED).json({message: "User ID is required."})
            }

            // generate a unique question id
            const questionid = uuidv4();

            // insert question into the database
            await dbConnection.query("INSERT INTO questions (questionid, title, description, userid) VALUES (?, ?, ?, ?)", [questionid, title, desc, userid]);

            return res.status(StatusCodes.CREATED).json({message: "Question submitted successfully."})
            
      } catch (error) {
            console.log("Error submitting question:", error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error, try again later."})
      }    
}



// rout to get a single question
router.get('/:questionid', getSingleQuestion);

// route to get all questions
router.get('/', getAllQuestions);

// route to submit a question
router.post('/', postQuestion);



module.exports = router;

