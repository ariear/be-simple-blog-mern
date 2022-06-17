import express from 'express'
import { loginController, registerController } from '../../controllers/auth/register.js'
import {body} from 'express-validator'

const auth = express()

auth.post('/register',[body('name').isLength({min:3}).withMessage('Nama minimal 3 karakter'), 
                    body('password').isLength({min: 4}).withMessage('Password minimal 4 karakter')] ,registerController)
auth.post('/login',[body('password').isLength({min: 4}).withMessage('Password minimal 4 karakter')], loginController)

export default auth