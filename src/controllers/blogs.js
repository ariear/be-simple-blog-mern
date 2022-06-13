import { validationResult } from 'express-validator'
import BlogPost from '../models/blog.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'
import fs from 'fs'

export const getBlogsController = (req , res) => {
    const currentPage = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    let totalData

    BlogPost.find()
        .countDocuments()
        .then(count => {
            totalData = count
            return BlogPost.find().sort({createdAt: 'desc'}).skip((currentPage - 1) * limit).limit(limit)
        }).then(results => {
                res.json(
                    {
                        message: 'Get Post Successfully!!',
                        data: results,
                        page: currentPage,
                        limit: limit,
                        total_data: totalData
                    }
                )
            } )

}
export const getDetailBlogController = (req , res) => {
    BlogPost.findById(req.params.id).then((results) => {
        if (!results) {
            throw new Error('Postingan tidak ditemukan')
        }
        res.json({
                data: results
            })
    })
}
export const postBlogsController = (req , res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       return res.status(400).json({
            'message': 'Invaldi Value',
            'data': errors.errors
        })
    }

    if (!req.file) {
        return res.status(400).json({
            'message': 'Image harus di upload',
            'data': errors.errors
        })
    }

    BlogPost.create({
        title: req.body.title,
        body: req.body.body,
        image: req.file.path,
        author: {uid: 1, name: 'Arie Akbarull'}
    }).then((results) => {
        res.status(201).json({
            message: 'Postingan berhasil di tambahkan',
            data: results
        })
    }).catch(err => console.log(err))

}
export const deleteBlogsController = (req , res) => {
    BlogPost.findById(req.params.id).then((post) => {
        if (!post) {
            const err = new Error('Postingan tidak ditemukab')
            err.errorStatus = 404
            throw err
        }
        removeImage(post.image)
        return BlogPost.findByIdAndRemove(req.params.id)
    }).then((results) => {
        res.status(200).json({
            message: 'Postingan berhasil di hapus',
            data: results
        })
    })
}

export const updateBlogController = (req ,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       return res.status(400).json({
            'message': 'Invaldi Value',
            'data': errors.errors
        })
    }

    if (!req.file) {
        return res.status(400).json({
            'message': 'Image harus di upload',
            'data': errors.errors
        })
    }

    BlogPost.updateOne({_id: req.params.id},{$set: {
        title: req.body.title,
        body: req.body.body,
        image: req.body.image
    }}).then((results) => {
        res.status(200).json({
            'message' : 'Postingan berhasil diperbaharui'
        })
    })

}

const removeImage = (filePath) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    filePath = path.join(__dirname, '../../', filePath)
    fs.unlink(filePath, err => console.log(err))
}