import React, { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'

import { BOOK_ADDED_SUB } from './queries/queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const cachedToken = localStorage.getItem("login-token");
    if (cachedToken) {
      setToken(cachedToken);
    }
  }, []);
  
  useSubscription(BOOK_ADDED_SUB, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      window.alert(`The book ${newBook.title} has been added.`)
    }
  })

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? ( <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommendations</button>
          <button onClick={logout}>logout</button> 
          </>) : (
          <button onClick={() => setPage('login')}>login</button>
          )
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

    </div>
  )
}

export default App