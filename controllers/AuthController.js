const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User Registration
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully'
            })
        })
        .catch(error => {
            res.json({
            message: 'An Error Occured'
            })
        })
    }) 
}

// User Login
const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    // Username = Email, Phone
    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '30s'})
                    let refreshToken = jwt.sign({name: user.name}, 'refreshToken', {expiresIn: '48h'})
                    res.json({
                        message: 'Login Successful',
                        token,
                        refreshToken
                    })
                }else{
                    res.json({
                        message: 'Password does not match'
                    })
                }
            })
        }else{
            res.json({
                message: 'No User Found'
            })
        }
    })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'refreshToken', function(err, decode){
        if(err){
            res.status(400).json({
                err
            })
        }else{
            let token = jwt.sign({name: decode.name}, 'verySecretValue', {expiresIn:'60s'})
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "Token Refreshed successfully",
                token,
                refreshToken
            })
        }
    })
}
module.exports = {
    register, login, refreshToken
}