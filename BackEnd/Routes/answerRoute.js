const express = require('express');
const router = express.Router();
const {postAnswer, getAnswer} = require('../Controller/answerController');

// answer routes
router.post('/answer', postAnswer);
router.get('/:questionid', getAnswer);

module.exports = router;