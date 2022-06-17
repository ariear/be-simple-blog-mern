import express from 'express'
import blogsRouter from './src/routes/blogs.js'
import bodyParser from 'body-parser'
import auth from './src/routes/auth/auth.js'
import mongoose from 'mongoose'
import multer from 'multer'
import 'dotenv/config'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use('/images', express.static('images'));
app.use(cors())

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req,file,cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})
const imageFilter = (req,file,cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) {
        cb(true)
    }else{
        cb(false)
    }
}
app.use(multer({storage: imageStorage}).single('image'))

app.use('/v1/auth',auth)
app.use('/v1/blogs',blogsRouter)

app.use((req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
})

mongoose.connect(process.env.APP_DB)
        .then(() => {
            app.listen(3000, () => {
                console.log(`app running on port 3000`);
            })
    }).catch(err => console.log(err))