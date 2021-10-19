import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = () => {

  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(newBlog))
    dispatch(setNotification(`Blog ${newBlog.title} has been created`, 'success', 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
            type="text"
          />
        </div>
        <div>
          title
          <input
            id='title'
            type="text"
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="url"
          />
        </div>
        <button id="btn-create">create</button>
      </form>
    </div>
  )
}

export default NewBlog