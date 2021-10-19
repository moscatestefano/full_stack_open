import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import Login from './components/Login'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/userReducer'
import storage from './utils/storage'

const App = () => {
  const dispatch = useDispatch()

  let user =  storage.loadUser() // from storage
  if (!user)
    user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  /*const userFound = useRouteMatch('/users/:id')
  const userIf = userFound
    ? users.find((user) => user.id === userFound.params.id)
    : null

  const blogFound = useRouteMatch('/blogs/:id')
  const blogIf = blogFound
    ? blogs.find((blog) => blog.id === blogFound.params.id)
    : null

  const handleLike = (blog) => {
    dispatch(like(blog)) // cambiare
    dispatch(setNotification(`Blog "${blog.title}" has been added.`, 'success'))
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(comment(blogFound, comment))
  }*/

  return (
    <div>
      <Switch>
        <Route path="/user/:id">
          <UserList />
        </Route>
        <Route path="/blogs/:id">
          <BlogList />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/users" >
          <UserList />
        </Route>
        <Route path="/" />
      </Switch>
    </div>
  )
  /*return (
    <div className="container">
      <Switch>
        <Route path="/users/:id">
          { user === null ? (
            <div>
              <Notification /> {/*si può eliminare}
              <LoginForm />
            </div>
          ) : (
            <div>
              <Header />
              <h1>bloglist</h1>
              <Notification />
              <h2>user.name</h2>
              <h3>Blogs added</h3>
              { !userif ? (
                null
              ) : (
                <ul>{ userIf.blogs.map((blog) => <li key={blog.id}>{blog}</li>) }</ul>
              )}
            </div>
          )}
        </Route>
        <Route path="/blogs/:id">
          { user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <Header />
              <h2>bloglist app</h2>
              <Notification />
              { !blogIf ? (
                null
              ) : (
                <div>
                  <h2>{blogIf.title}</h2>
                  <p>{blogIf.url}</p>
                  <p>{blogIf.likes}</p>
                  <Button onClick={handleLike(blogIf)}>Like</Button>
                  <p>This blog was added by {blogIf.author}</p>
                  <h3>Comment section</h3>
                  <form onSubmit={handleComment}>
                    <div>
                      <input id="comment" type="text" />
                      <Button id="btn-comment" type="submit">Add comment</Button>
                    </div>
                  </form>
                  <ul>
                    {blogIf.comments.map((comment) => <li key={comment}>{comment}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Route>
        <Route path="/blogs">
          { user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <h2>bloglist app</h2>
              <Notification />
              <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <Bloglist />
            </div>
          )}
        </Route>
        <Route path="/users">
          { user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <Header />
              <h2>bloglist app</h2>
              <Notification />
              <h2>users</h2>
              <UserList />
            </div>
          )}
        </Route>
        <Route path="/">
          <Notification />
          <LoginForm />
        </Route>
      </Switch>
    </div>
  )*/
}

export default App