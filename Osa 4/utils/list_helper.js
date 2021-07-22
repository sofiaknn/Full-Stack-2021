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
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}