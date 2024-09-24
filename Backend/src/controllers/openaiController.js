// const { ApiError } = require("../utils/ApiError");
// const { ApiResponse } = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/asyncHandler");

// const { Configuration, OpenAiApi } = require('openai')
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })
// const openai = new OpenAiApi(configuration)

// const searchWord = asyncHandler(async (req, res) => {
//     const { word } = req.body;
//     if (!word) {
//         throw new ApiError(400, 'Word is required in the request body')
//     }

//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: `Give me the meaning and a sample sentence for the word "${word}".`,
//         max_tokens: 100,
//     })

//     const completion = response.data.choices[0].text.trim()

//     return res.status(200).json({
//         word,
//         meaningAndSentence: completion,
//     });

// })
// module.exports = { searchWord }


const OpenAI = require("openai");

// Instantiate the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const searchWordMeaning = async (req, res) => {
    const { word } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant.",
                },
                {
                    role: "user",
                    content: `Give me the meaning and an example sentence for the word "${word}"`,
                },
            ],
            max_tokens: 50,
        });

        const result = response.choices[0].message.content.trim();
        res.status(200).json({ meaning: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { searchWordMeaning };
