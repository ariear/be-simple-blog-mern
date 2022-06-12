import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: Object,
        required: true
    }
},{
    timestamps: true
})

const BlogPost = mongoose.model('BlogPost' , BlogSchema)

export default BlogPost