const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
    },
    unknownWords:
        [
            {

                type: mongoose.Schema.Types.ObjectId,
                ref: "Word"
            }
        ],
    scores: [
        {
            score: {

                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            fullmark: {
                type: Number,
                required: true
            }
        }]

})
module.exports = mongoose.model('User', UserSchema)