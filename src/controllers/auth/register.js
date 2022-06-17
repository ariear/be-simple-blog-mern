import { validationResult } from 'express-validator'
import User from "../../models/user.js"
import jwt from 'jsonwebtoken'

export const registerController = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invaldi Value',
            error: errors.errors
        })
    }
    
    const data = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    }

    User.create(data).then(results => {
        res.json({
            message: 'Registered',
            data: data
        })
    }).catch(err => console.log(err))
}

export const loginController = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invaldi Value',
            error: errors.errors
        })
    }

    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(results => {
        if (!results) {
            return res.status(400).json({
                message: 'User Not Found'
            })
        }    

        const token = jwt.sign({
            name: results.name,
            email: results.email
        }, 'secret123')
        
        res.json({
            message: 'Login',
            data: results,
            token: token
        })
    })
}