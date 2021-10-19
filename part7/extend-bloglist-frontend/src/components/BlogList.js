import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const sortByLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>{blogs.sort(sortByLikes).map((blog) => <Blog key={blog.id} blog={blog} />)}</div>)
}

export default BlogList