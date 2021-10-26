import React from 'react'
import { GET_BOOKS, ME } from '../queries/queries'
import { useQuery } from '@apollo/client'

const Recommendations = (props) => {
    const resultUser = useQuery(ME)

    const favoriteGenre = resultUser?.data?.me.favoriteGenre

    const resultBooks = useQuery(GET_BOOKS, {
        variables: favoriteGenre
    })

    if (!props.show)
        return null

    if (!resultBooks.data)
        return null

    return (
        <div>
            <h2>
                Recommendations
            </h2>
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {resultBooks
                    ? <>
                    {resultBooks.allBooks.map((book) => {
                        return (<tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>)
                    })}
                    </>
                    : <>
                    <tr>
                        There are no books that match your preferences.
                    </tr>
                    </>}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations