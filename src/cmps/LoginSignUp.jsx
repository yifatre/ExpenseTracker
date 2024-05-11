import { useState } from 'react'
import { userService } from '../services/user.service'
import { login, logout, signup } from '../store/actions/user.actions'
import { useSelector } from 'react-redux'

export function LoginSignUp() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignup, setIsSignup] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((credentials) => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('123',)
        if (isSignup) {
            try {
                const user = await signup(credentials)
                console.log(`Welcome ${user.fullName}`)
            } catch (err) {
                console.error('Cannot signup', err)
            }
        } else {
            try {
                const _user = await login(credentials)
                console.log('_user', _user)
                console.log(`Hi again ${_user.fullName}`)
            } catch (err) {
                console.error('Cannot login', err)
            }
        }
    }

    function onToggleSignupState() {
        setIsSignup((isSignupState) => !isSignupState)
    }

    const { username, password, fullName } = credentials

    return <div className='login-signup'>
        {!loggedInUser && <><form className="login-form flex" onSubmit={onSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleCredentialsChange}
                required
                autoFocus
            />

            <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleCredentialsChange}
                required
            />

            {isSignup && (
                <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />
            )}

            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>

            <div className="btns">
                <a href="#" onClick={onToggleSignupState}>
                    {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
                </a>
            </div></>}
        {loggedInUser && <>
            <span>Hello {loggedInUser.fullName}</span>
            <button onClick={logout}>Logout</button>
        </>}
    </div>
}