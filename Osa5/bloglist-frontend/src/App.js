import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (err) {
      setMessage(
        'wrong username or password'
      )

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        setMessage({ error: 'Please fill in all the fields' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        return
      }

      await blogService.create(blogObject)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      setMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (err) {
      setMessage({
        error: `Not added! ${err}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.error(err)
    }
  }

  const addLike = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)

      const updatedBlog = {
        ...blogObject,
        id,
      }

      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    } catch (err) {
      console.error(err)
      setMessage({
        error: `Not updated! ${err}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.filter((blog) => blog.id === id)

      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {
        await blogService.deleteBlog(id)

        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (err) {
      console.error(err)
      setMessage({
        error: `Not deleted! ${err}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="succeed">
        {message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={logOut}>logout</button> </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id}
            blog={blog}
            updateLike={addLike}
            remove={deleteBlog}
            user={user} />
        )}
    </div>
  )
}

export default App