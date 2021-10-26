import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token =   result.data.login.value
            props.setToken(token)   
            localStorage.setItem('login-token', token)
        }
    }, [props, result.data])

    const handleSubmit = async (event) => {
        event.preventDefault()
        login({variables: {username: username, password: password}})
        setUsername("")
        setPassword("")
        props.setPage("authors")
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    if (!props.show)
        return null

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div><label>
                    username
                    <input type="text" value={username} onChange={handleUsername} />
                </label></div>
                <div><label>
                    password
                    <input type="password" value={password} onChange={handlePassword} />
                </label></div>
                <div>
                    <button type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login