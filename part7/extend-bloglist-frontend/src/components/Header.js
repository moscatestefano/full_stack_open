import React from 'react'
import { Link, Switch, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state) => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  return (
    <div>
      <Switch>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        { user ? (
          <>
            <span>{user.name} logged in {' '}</span>
            <button onClick={handleLogout}>logout</button>
          </>) : (
          null
        )}
      </Switch>
    </div>
  )
}

export default Header