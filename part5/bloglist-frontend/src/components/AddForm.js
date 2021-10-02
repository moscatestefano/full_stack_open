import React, { useState } from 'react'

const AddForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleTitle = (value) => {
    setTitle(value)
  }

  const handleAuthor = (value) => {
    setAuthor(value)
  }

  const handleUrl = (value) => {
    setUrl(value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    createBlog(newBlog)
  }

  return ( <div className="formDiv">
    <form onSubmit={addBlog}>
      <div>
                title: <input id="title" type="text" value={title} name="Title" onChange={({ target }) => handleTitle(target.value)} />
      </div>
      <div>
                author: <input id="author" type="text" value={author} name="Author" onChange={({ target }) => handleAuthor(target.value)} />
      </div>
      <div>
                url: <input id="url" type="url" value={url} name="url" onChange={({ target }) => handleUrl(target.value)} />
      </div>
      <br/>
      <button type="submit">Submit</button>
    </form>
  </div>

  )
}

export default AddForm