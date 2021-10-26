import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_AUTHORS, UPDATE_BIRTHYEAR } from '../queries/queries'
import { useState } from 'react'

const Authors = (props) => {

  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")
  const [dropdown, setDropdown] = useState("")

  const [updateAuthor] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [ { query: GET_AUTHORS } ]
  })

  const result = useQuery(GET_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <p>
        fetching data...
      </p>
    )
  }
  
  if (!result.data)
    return null

  const authors = result.data.allAuthors

  const handleUpdate = (event) => {
    event.preventDefault()

    setYear(event.target.birthyear.value)
    setAuthor(dropdown)
    
    updateAuthor({variables: { author: author, birthyear: parseInt(year) }})

    setYear('')
    setAuthor(authors[0].name)
  }

  const handleYear = (event) => {
    setYear(event.target.value)
  }
  
  const handleChange = (event) => {
    setDropdown(event.target.value)
    setAuthor(event.target.value)

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map((a) =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Edit author</h2>
        <form onSubmit={handleUpdate}>
          <label>
            Select the author:
            <select onChange={handleChange}>
              {authors.map((a) => <option key={a.name} id={a.name}>{a.name}</option>)}
            </select>
          </label>
          <br/>
          <label>
            Insert birthyear
            <input id="birthyear" value={year} type="text" onChange={handleYear}/>
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
