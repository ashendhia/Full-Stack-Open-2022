const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user')
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes || 0
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        response.status(404).end()
    }
    else {
        if (user._id.toString() === blog.user.toString()) {
            await Blog.findOneAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(403).end()
        }
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const user = request.user
    const body = request.body

    const oldblog = await Blog.findById(request.params.id)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    if (!oldblog) {
        response.status(404).end()
    }
    else {
        if (user._id.toString() === oldblog.user.toString()) {
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            response.json(updatedBlog)
        } else {
            response.status(403).end()
        }
    }
})

module.exports = blogsRouter