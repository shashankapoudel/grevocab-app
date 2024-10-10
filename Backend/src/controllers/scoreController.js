const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const addUserScore = asyncHandler(async (req, res) => {
    const { score, userId, fullmark } = req.body;
    console.log(fullmark);


    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, 'User not found')
    }
    user.scores.push({ score, fullmark })
    console.log(user);
    await user.save()
    return res.status(201).json(new ApiResponse(200, 'score saved successfully'))

})

const getUserScores = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, 'User not found')
    }
    return res.status(201).json(new ApiResponse(200, user.scores, 'Scores received successfully'))
})


module.exports = { addUserScore, getUserScores }