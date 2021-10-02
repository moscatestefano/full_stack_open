import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddForm from './components/AddForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/logins'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const toggleRef = useRef()

  useEffect( async () => {
    const blogs = await blogService.getAll()
    setBlogs( blogs )
  }, [])

  useEffect(() => {
    const loggedUserFromBrowser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserFromBrowser) {
      const user = JSON.parse(loggedUserFromBrowser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.logins({
        username, password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setSuccessMessage(`${user.name} LOGIN SUCCESSFUL.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('WRONG CREDENTIALS')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const createBlog = async (newblog) => {

    try {
      toggleRef.current.toggleVisibility()
      await blogService.create(newblog)
      setSuccessMessage(`${newblog.title} has been added to the list.`)
      setBlogs(blogs.concat(newblog))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    } catch (exception) {
      setErrorMessage('WRONG FORMAT')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const updateBlog = async (updatedBlog) => {
    console.log(updatedBlog)
    try {
      await blogService.update(updatedBlog)
      setSuccessMessage(`${updatedBlog.title} has been liked.`)
      blogs.sort((first, second) => second.likes - first.likes)
      setBlogs(blogs.map(blog => blog.title !== updatedBlog.title ? blog : updatedBlog))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    } catch (exception) {
      setErrorMessage('WRONG PUT METHOD')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const cancelBlog = async (blogId) => {
    await blogService.cancelEntry(blogId)
    setBlogs(blogs.filter(blog => String(blog.id) !== blogId))
    setSuccessMessage(`${blogId} has been deleted.`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleUsername = (value) => {
    setUsername(value)
  }

  const handlePassword = (value) => {
    setPassword(value)
  }

  return (
    <div>
      <Notification className="error" message={errorMessage} />
      <Notification className="success" message={successMessage} />
      {user === null
        ? <Login name={username} password={password} handleLogin={handleLogin} handleUser={handleUsername} handlePass={handlePassword}/>
        : (<>
          <p>{user.name} logged in.</p> <button onClick={handleLogout}>Logout</button>
          <br/>
          <Togglable buttonLabel="Add a new blog" ref={toggleRef}><AddForm createBlog={createBlog} /></Togglable>
          <br/>
          <h2>blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={cancelBlog} />)}
        </>)}
    </div>
  )
}

export default App