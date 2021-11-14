const mongoose = require('mongoose')
const { Schema } = mongoose

const tokenSchema = new Schema({
    userId : {
        type : String,
        required:true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: '1y'
    }
})

const RefreshToken = mongoose.model('RefreshToken', tokenSchema)
module.exports = RefreshToken