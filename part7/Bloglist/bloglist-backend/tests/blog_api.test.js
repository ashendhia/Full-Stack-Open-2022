const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzMjRkM2Y5YTM1ODY2YzQ3ZDg3ZjE4NCIsImlhdCI6MTY2Mzg4NjgzN30.WaMxWbn0yppUomKzAHWSShK1nlS-vxQ3-FSnPWyo9qg"


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogTest = new Blog({
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        user: "6324d3f9a35866c47d87f184",
        likes: 7
    })
    await blogTest.save()
    blogTest = new Blog({
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        user: "6324d3f9a35866c47d87f184",
        likes: 10
    })
    await blogTest.save()
}, 100000)

describe('viewing blogs', () => {

    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('blogs unique identifier is named id', async () => {
        const blogsInDb = await helper.blogsInDb()
        blogsInDb.map(blog => {
            expect(blog.id).toBeDefined()
        })
    })

})

describe('addition of a new blog', () => {

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: `bearer ${token}` })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        const contents = blogsAtEnd.map(b => {
            return ({
                title: b.title,
                author: b.author,
                url: b.url
            })
        })
        expect(contents).toContainEqual(
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
            }
        )
    })

    test('a blog missing the likes property will default to 0', async () => {
        const newBlog = {
            title: 'Hello to the other World',
            author: 'dhiaa',
            url: 'www.dhiaa.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: `bearer ${token}` })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        const contents = blogsAtEnd.map(b => {
            return ({
                title: b.title,
                author: b.author,
                url: b.url,
                likes: b.likes
            })
        })
        expect(contents).toContainEqual({
            title: 'Hello to the other World',
            author: 'dhiaa',
            url: 'www.dhiaa.com',
            likes: 0
        })
    })

    test('blog without token is not added', async () => {
        const newNote = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }

        await api
            .post('/api/blogs')
            .send(newNote)
            .expect(401)
    })

    test('blog without title is not added', async () => {
        const newNote = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }

        await api
            .post('/api/blogs')
            .send(newNote)
            .set({ Authorization: `bearer ${token}` })
            .expect(400)
    })

    test('blog without url is not added', async () => {
        const newNote = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }

        await api
            .post('/api/blogs')
            .send(newNote)
            .set({ Authorization: `bearer ${token}` })
            .expect(400)
    })
})

describe('deletion of a blog', () => {
    test('blog with proper id will be succesfully deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: `bearer ${token}` })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd.map(b => b.title)

        expect(contents).not.toContain(blogToDelete.title)
    })
    test('blog with invalid id wont be deleted', async () => {
        const invalidId = await helper.nonExistingId()
        await api
            .delete(`/api/blogs/${invalidId}`)
            .set({ Authorization: `bearer ${token}` })
            .expect(404)
    })
})

describe('upadting of a blog', () => {

    test('a blog with a successful id will be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                title: blogToUpdate.title,
                author: blogToUpdate.author,
                url: blogToUpdate.url,
                user: blogToUpdate.user,
                likes: blogToUpdate.likes + 1
            })
            .set({ Authorization: `bearer ${token}` })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).not.toContainEqual(blogToUpdate)
    })
    test('a blog with wrong id wont be updated', async () => {
        const invalidId = await helper.nonExistingId()

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${invalidId}`)
            .send(blogToUpdate)
            .set({ Authorization: `bearer ${token}` })
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toContainEqual(blogToUpdate)
    })
})

/*describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username already exists', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

afterAll(() => {
    mongoose.connection.close()
})*/
