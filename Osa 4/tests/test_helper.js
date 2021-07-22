const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
    title: "Linda Juhola",
    author: "Linda Juhola",
    url: "https://lindajuhola.com/",
    likes: 15
    },
    {
    title: "Alexa Dagmar",
    author: "Alexa Dagmar",
    url: "https://alexadagmar.com/",
    likes: 16
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}