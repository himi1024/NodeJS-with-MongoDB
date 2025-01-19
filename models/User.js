const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserScheme = new Schema({
    name:        { type: String },
    email:       { type: String },
    phone:       { type: String },
    password:    { type: String },
}, {timestamps: true})

const User = mongoose.model('User', UserScheme)
module.exports = User