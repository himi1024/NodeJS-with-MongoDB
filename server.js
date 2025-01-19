
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routes/employee')
const AuthRoute     = require('./routes/auth')

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// http://localhost:3000/uploads/<image>
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})

// API-endpoint
app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)