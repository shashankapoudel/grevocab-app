const express = require('express')
const { getQuizQuestions } = require('../controllers/quizController')

const router = express.Router()
router.get('/quizq', getQuizQuestions)
module.exports = router;