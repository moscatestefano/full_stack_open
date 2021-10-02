import React, { useState } from 'react'

const Blog = ({ updateBlog, deleteBlog, blog }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleUpdate = () => {
    const newObject = {
      id: blog.id,
      userId: blog.userId,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(newObject)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div id="blog-container" style={blogStyle} className="blog">
      {blog.title} {blog.author} <button onClick={toggleVisible}>{visible? 'Hide' : 'View details'}</button>
      <div style={showWhenVisible} className="togglableContent">
      Url: {blog.url}<br/>
      Likes: {blog.likes} <button onClick={handleUpdate}>Like</button><br/>
      User: {blog.userId.name}<br/>
        <button onClick={handleDelete}>Delete Blog</button>
      </div>
    </div>
  )
}

export default Blog