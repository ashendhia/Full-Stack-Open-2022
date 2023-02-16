const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: String,
    url: {
        required: true,
        type: String
    },
    comments: {
        type: [{
            type: String,
            required: true
        }],
        required: true
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)