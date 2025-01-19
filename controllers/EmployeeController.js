const { response } = require('express')
const Employee = require('../models/Employee')


// List out the Employees
const index = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured'
        })
    })
}

// Show Employee By ID
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        req.json({
            message: 'An Error Occured'
        })
    })
}

// Adding Employee
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    /* Single File
    if(req.file){
        employee.avatar = req.file.path
    }
    */
    // Multiple Files
    if(req.files){
        let path = ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path + ','
        })
            path = path.substring(0, path.lastIndexOf(","))
            employee.avatar = path
    }
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee Added Sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured'
        })
    })
}

// Update an Employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let  updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Employee updated successfully'
        })
    })
    .catch(error => {
            res.json({
                message: 'An Error Occured'
        })
    })
}

// Delete an Employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findOneAndDelete(employeeID)
    .then(() => {
        res.json({
            message: 'Employee Deleted Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured'
        })
    })
}


module.exports = {
    index, show, store, update, destroy
}