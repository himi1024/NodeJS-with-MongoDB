const express = require('express')
const router = express.Router()

// Import the Employee Controller
const EmployeeController = require('../controllers/EmployeeController')
const upload             = require('../middleware/upload')
const authenticate       = require('../middleware/authenticate')

// API Endpoint
router.get('/', authenticate, EmployeeController.index)
router.post('/show', EmployeeController.show)
// Upload Single File
//router.post('/store', upload.single('avatar'), EmployeeController.store)
// Upload Multiple Files
router.post('/store', upload.array('avatar[]'), EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/delete', EmployeeController.destroy)

module.exports = router
