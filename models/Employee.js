const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongoosePaginate = require('mongoose-paginate-v2')

const employeeScheme = new Schema({
    name:        { type: String },
    designation: { type: String },
    email:       { type: String },
    phone:       { type: String },
    age:         { type: Number },
    avatar:      { type: String }
}, {timestamps: true})

employeeScheme.plugin(mongoosePaginate)
const Employee = mongoose.model('Employee', employeeScheme)
module.exports = Employee