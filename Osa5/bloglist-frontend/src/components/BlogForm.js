/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title'
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author:
          <input
            id='author'
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            id='url'
            type="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button id='create-button' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}