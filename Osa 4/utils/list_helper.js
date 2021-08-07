const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const blogLikes = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => sum + item

    return blogLikes.reduce(reducer)
}
const favoriteBlog = (blogs) => {
    const blogLikes = blogs.map(blog => blog.likes)
    const mostLikes = Math.max(...blogLikes)
    const isLargest = (element) => element === mostLikes
    const index = blogLikes.findIndex(isLargest)

    const returnedBlog = {
        "author": blogs[index].author,
        "likes": mostLikes,
        "title": blogs[index].title
    }
    return returnedBlog
}

const mostBlogs = (blogs) => {
    const blogsMap = _.countBy(blogs, (blog) => blog.author)
    const authorsBlogs = _.keys(blogsMap).map(author => {
        return {
            author,
            blogs: blogsMap[author]
        }
    })

    return authorsBlogs.reduce((pv, cv) => pv.count > cv.count ? pv : cv, {})
}

const mostLikes = (blogs) => {
    let blog = _.orderBy(blogs, ['likes'], ['desc'])[0];
    return ({ author: blog.author, likes: blog.likes })
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}