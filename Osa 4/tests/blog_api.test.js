const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
    await User.deleteMany({})
    const user = {
        username: "sofia",
        name: "test sofia",
        password: "salasana"
    }
    await api
        .post('/api/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are 2 blogs on the list', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('there is id defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('addition of new blog', () => {
    test('post succeeded', async () => {
        const logUser = {
            username: 'sofia',
            password: 'salasana'
        }
        const loggedIn = await api
            .post('/api/login')
            .send(logUser)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${loggedIn.body.token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain('Canonical string reduction')
    })

    test('if likes undefined, set to 0', async () => {
        const logUser = {
            username: 'sofia',
            password: 'salasana'
        }
        const loggedIn = await api
            .post('/api/login')
            .send(logUser)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: 'Tuni',
            author: 'Tampere University',
            url: 'https://www.tuni.fi/fi',
        }
    
        const checkBlog = {
            title: 'Tuni',
            author: 'Tampere University',
            url: 'https://www.tuni.fi/fi',
            likes: 0
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${loggedIn.body.token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const result = response.body[response.body.length - 1]
        expect(result.likes).toEqual(checkBlog.likes)
    })

    test('if title or url is empty', async () => {
        const logUser = {
            username: 'sofia',
            password: 'salasana'
        }
        const loggedIn = await api
            .post('/api/login')
            .send(logUser)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: 'Full Stack Open 2021',
            author: 'University of Helsinki',
            likes: 35
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${loggedIn.body.token}`)
            .expect(400)
    })

    test('if token is not provided blog is not added', async () => {
        const newBlog = {
          title: 'Testing',
          author: 'Juuso',
          url: 'https://fullstackopen.com/',
          likes: 4
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

    test('update succeeded', async () => {
        const logUser = {
            username: 'sofia',
            password: 'salasana'
        }

        const loggedIn = await api
            .post('/api/login')
            .send(logUser)
            .expect('Content-Type', /application\/json/)

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `bearer ${loggedIn.body.token}`)
            .send({ likes: 22 })
            .expect(200)
            
        const blogsAtEnd = await helper.blogsInDb()

        const updatedBlog = blogsAtEnd[0]

        expect(updatedBlog.likes).toBe(22)
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)


    })
})
describe('deletion of blog', () => {
    test('a blog can be deleted', async () => {
        const logUser = {
            username: 'sofia',
            password: 'salasana'
        }

        const loggedIn = await api
            .post('/api/login')
            .send(logUser)
            .expect('Content-Type', /application\/json/)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${loggedIn.body.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
    })
})
  
afterAll(() => {
    mongoose.connection.close()
})