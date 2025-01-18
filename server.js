
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routes/employee')

mongoose.connect('mongodb://localhost:27017/testdb')
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection is Established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})

// Employee API-endpoint
app.use('/api/employee', EmployeeRoute)