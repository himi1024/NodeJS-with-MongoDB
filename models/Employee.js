const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeScheme = new Schema({
    name:        { type: String },
    designation: { type: String },
    email:       { type: String },
    phone:       { type: String },
    age:         { type: Number }
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeScheme)
module.exports = Employee