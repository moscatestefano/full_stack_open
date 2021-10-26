import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries/queries'

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const [getBooks, result] = useLazyQuery(GET_BOOKS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getBooks()
  }, [result])

  const genres = result.data?.allBooks.map((book) => book.genres)
  const dropdown = genres?.map((selection) => { 
    return {value: selection // IT SHOULD BE A SET
    }})

  const handleGenreChange = (genreModified) => {
    setGenre(genreModified.value)
    GET_BOOKS({ variables: { genre: genre } }) // IT COULD BE DONE WITH books.filter TOO
  }

  if (!props.show) {
    return null
  }

  if (!result.data)
    return null

  const books = result.data?.allBooks
  console.log(books)

  return (
    <div>
      <h2>books</h2>
      <div>
        <label>
          Filter books by genre
          <select onChange={handleGenreChange}>
                  {dropdown?.map((a) => <option key={a.value} id={a.value}>{a.value}</option>)}
          </select>
        </label>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books?.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books