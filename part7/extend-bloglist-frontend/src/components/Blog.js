import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => {
    dispatch(voteBlog(blog))
    dispatch(setNotification(`Blog ${blog.title} has been liked`, 'success', 5))
  }

  const cancelBlog = () => {
    dispatch(removeBlog(blog.id))
    dispatch(setNotification(`Blog ${blog.title} has been removed`, 'success', 5))
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={toggleVisibility}>{label}</button>
      </div>
      {visible ? (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={likeBlog(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={cancelBlog(blog.id)}>remove</button>
        </div>
      ) : (
        null
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired
}

export default Blog