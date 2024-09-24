const generateToken = require("../config/generateToken");
const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ApiError(400, "name, email and password is required")
    }
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new ApiError(400, 'User with this email already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword })
    const token = generateToken(user._id)
    const newUser = await user.toObject();
    newUser.token = token;


    return res.status(201).json(new ApiResponse(200, newUser, "User registered successfully"));
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        throw new ApiError(400, 'Password and email is required')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(400, 'User with this email doesnot exist')
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw new ApiError(400, 'Incorrect Password')
    }
    const token = generateToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password")
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie(options).json(
        new ApiResponse(200, {
            user: loggedInUser, token
        }, "User logged In Successfully")
    )
})


module.exports = { registerUser, loginUser }