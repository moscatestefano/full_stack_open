import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../queries/queries'
import { GET_BOOKS } from '../queries/queries'

const NewBook = (props) => {

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: GET_BOOKS } ]
  })

  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('ADDING BOOK...', title, published, author, genres)
    createBook({  variables: { title, published: parseInt(published), author, genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook