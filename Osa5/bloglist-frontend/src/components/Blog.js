import React, { useState } from 'react'


const Blog = ({ blog, updateLike, remove, user }) => {
  const [expanded, setExpanded] = useState(false)
  const [username, setUsername] = useState('')
  const [postedBy, setPostedBy] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const hideWhenVisible = { display: expanded ? 'none' : '' }
  const showWhenVisible = { display: expanded ? '' : 'none' }

  const like = () => {
    const likes = blog.likes + 1
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      user: blog.user?.id || blog.user,
    }

    setPostedBy(postedBy || blog.user?.name)
    setUsername(username || blog.user?.username)
    updateLike(blog.id, newBlog)
  }

  const deleteBlog = () => {
    const { id } = blog

    remove(id)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} >
        {blog.title} {blog.author}
        <button id='view-button' onClick={toggleExpanded}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>hide</button> <br />
        {blog.url} <br />
        {blog.likes} likes <button id='like-button' onClick={like}>like</button> <br />
        {(blog.user?.username === user.username ||
          username === user.username) && (
          <button id='remove-button' onClick={deleteBlog}>
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog