const Word = require("../models/Word");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


const getQuizQuestions = asyncHandler(async (req, res) => {
    const quizLength = parseInt(req.query.limit) || 10;
    const words = await Word.aggregate([{ $sample: { size: quizLength } }])

    const quizQuestions = words.map(word => ({
        question: `What is the meaning of "${word.word}"?`,
        correctAnswer: word.meaning,
        choices: generateChoices(word.meaning, words)
    }));
    return res.status(200).json(new ApiResponse(200, quizQuestions, 'Questions generated successfully'));

})

const generateChoices = (correctAnswer, words) => {
    const choices = new Set()
    choices.add(correctAnswer)

    while (choices.size < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)]
        if (randomWord.meaning !== correctAnswer) {
            choices.add(randomWord.meaning)
        }
    }
    return Array.from(choices);
}

module.exports = {
    getQuizQuestions
}