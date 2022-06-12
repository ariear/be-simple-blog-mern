import express from 'express'
import { registerController } from '../../controllers/auth/register.js'

const register = express()

register.post('/register', registerController)

export default register