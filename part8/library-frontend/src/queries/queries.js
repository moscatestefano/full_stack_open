import { gql } from '@apollo/client'

const BOOK_SPECIFICS = gql`
    fragment bookSpecifics on Book {
        title
        published
        author {
            name
            born
            bookCount
        }
        genres
        id
    }
`

export const GET_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookcount
        }
    }
`

export const GET_BOOKS = gql`
    query {
        allBooks {
            ...bookSpecifics
        }
    }
    ${BOOK_SPECIFICS}
`

export const ADD_BOOK = gql`
    mutation createBook ($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
    )   {
        ...bookSpecifics
        }
    }
    ${BOOK_SPECIFICS}
`

export const BOOK_ADDED_SUB = gql`
    subscription {
        bookAdded {
            ...bookSpecifics
        }
    }
    ${BOOK_SPECIFICS}
`

export const UPDATE_BIRTHYEAR = gql`
    mutation modifyBirthyear($author: String!, $birthyear: Int!) {
        updateBirthyear(
            name: $author
            born: $birthyear
    )   {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username
            password: $password
    )   {
            value
        }
    }
`

export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`