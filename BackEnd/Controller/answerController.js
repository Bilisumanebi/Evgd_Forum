const { StatusCodes } = require('http-status-codes');
const dbConnection = require('../db/dbConfig');




async function getAnswer(req, res){
      const {questionid} = req.params;

      try {
            const response = await dbConnection.query('SELECT users.username, answers.answer FROM users JION answers ON answers.userid = users.userid WHERE answers.questionid = ?', [questionid]);
            if (response.length === 0){
                  return res.status(StatusCodes.NOT_FOUND).json({message: "No answer found for this question"})
            }
            // nstead of response[0], the entire response is returned to provide all answers for the question.
            return res.status(StatusCodes.OK).json({response})
            
      } catch (error) {
            console.log("Error fetching answers:", error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error, try again later"})
      }
}

// post answers to a question
async function postAnswer(req, res){
      const {userid, questionid, answer} = req.body;

      // validate input
      if (!answer){
            return res.status(StatusCodes.BAD_REQUEST).json({error: "Bad Request", message: "Please provide an answer."})
      }
      if (!userid){
            return res.status(StatusCodes.UNAUTHORIZED).json({error: "Unauthorized", message: "You must be logged in to post an answer"}) 
      }
      if (!questionid){
            return res.status(StatusCodes.BAD_REQUEST).json({error: "Bad Request", message: "Question ID is required"})
      }

      try {
            // insert the answer into the database
            await dbConnection.query("INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)", [userid, questionid, answer]);
            return res.status(StatusCodes.CREATED).json({message: "Answer posted successfully"})
            
      } catch (error) {
            console.log("Error posting answer:", error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Internal server error, try again later"})
      }
   
}

module.exports = { getAnswer, postAnswer }
