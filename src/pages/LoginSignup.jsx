import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/userService.js'
import { login, signup } from '../store/actions/userActions.js'

export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSubmit(credentials)
    }

    function onSubmit(credentials) {
        isSignup ? onSignup(credentials) : onLogin(credentials)
    }

    async function onLogin(credentials) {
        try {
            await login(credentials)
            showSuccessMsg('Logged in successfully')
        } catch (err) {
            showErrorMsg('Oops, try again')
        }
    }

    async function onSignup(credentials) {
        try {
            await signup(credentials)
            showSuccessMsg('Signed up successfully')
        } catch (err) {
            showErrorMsg('Oops, try again')
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
                {isSignup && <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Full name"
                    onChange={handleChange}
                    required
                />}
                <button>{isSignup ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <a href="#" onClick={(ev) => { ev.preventDefault(); setIsSignUp(!isSignup); }}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a>
            </div>
        </div>
    )
}
