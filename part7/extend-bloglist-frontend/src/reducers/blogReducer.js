import blogService from '../services/blogs'

const blogReducer = (state= [], action) => {
  console.log('State:', state, 'ACTION:', action)

  switch(action.type) {
  case 'ON_INIT':
    return action.data
  case 'NEW':
    return [...state, action.data]
  case 'VOTE': {
    const id = action.data.id
    const votedBlog = state.find((blog) => blog.id === id)
    const newBlog = {
      ...votedBlog,
      likes: votedBlog.votes += 1
    }
    return state.map((blog) => blog.id === id ? blog : newBlog)
  }
  case 'DELETE': {
    const id = action.data.id
    return state.filter((blog) => blog.id !== id)
  }
  case 'COMMENT': {
    const id = action.data.id // occhio qui
    const commentId = action.data.commentId // occhio qui
    const title = action.data.title // occhio qui

    const blog = state.find((blog) => blog.id === id)
    const newComment = {
      title: title,
      id: id
    }
    const commentedBlog = {
      ...blog,
      comments: [...blog.comments, newComment]
    }

    return state.map((blog) => blog.id !== commentId ? blog : commentedBlog)
  }
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'ON_INIT',
      data: blogs
    })
  }
}

export const  createBlog = (data, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    const blogAndUser = { ...newBlog, user: { name: user.name } }
    dispatch({
      type: 'NEW',
      data: blogAndUser
    })
  }
}

export const voteBlog = (id, blog) => {
  return async dispatch => {
    await blogService.vote(id, blog)
    dispatch({
      type: 'VOTE',
      data: blog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.cancelBlog(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const writeComment = (id, comment) => {
  return async dispatch => {
    const commentId = id
    const newComment = await blogService.addComment(id, comment)
    const newAndUpdatedComment = {
      ...newComment, commentId
    }
    dispatch({
      type: 'COMMENT',
      data: newAndUpdatedComment
    })
  }
}

export default blogReducer