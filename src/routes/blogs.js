import express from 'express'
import { deleteBlogsController, getDetailBlogController, getBlogsController, postBlogsController, updateBlogController } from '../controllers/blogs.js'
import {body} from 'express-validator'

const blogs = express()

blogs.get('/posts', getBlogsController)
blogs.get('/posts/:id', getDetailBlogController)
blogs.put('/posts/:id/edit',[body('title').isLength({min: 5}).withMessage('Judul minimal 5 karakter'), 
                            body('body').isLength({min: 5}).withMessage('Body minimal 5 karakter')] , updateBlogController)
blogs.post('/', [body('title').isLength({min: 5}).withMessage('Judul minimal 5 karakter'), 
                body('body').isLength({min: 5}).withMessage('Body minimal 5 karakter')] 
            ,postBlogsController)
blogs.delete('/posts/:id', deleteBlogsController)

export default blogs