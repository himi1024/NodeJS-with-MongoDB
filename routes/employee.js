const express = require('express')
const router = express.Router()

// Import the Employee Controller
const EmployeeController = require('../controllers/EmployeeController')
// const Employee = require('../models/Employee')


//API Endpoint
router.get('/', EmployeeController.index)
router.post('/show', EmployeeController.show)
router.post('/store', EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/delete', EmployeeController.destroy)

module.exports = router