import { useState } from 'react'
import './Login.css'
import AuthService from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const {
        isLoading,
        message,
        error,
        clearMessages,
        handleLogin
    } = AuthService()

    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    })

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // clear previous messages
        clearMessages()

        if (!formData.userName || !formData.password) {
            alert('All fields required')
        }

        await handleLogin(formData);
        
        // Your login logic here
        console.log('Login submitted:', formData);
    }

    const handleRegisterRedirect = () => {
        // Navigate to register page
        navigate('/register')
    }

    const handleForgotPassword = () => {
        // Navigate to forgot password page
        console.log('Forgot password');
    }

    return (
        <div className='login-main-container'>
            <div className='login-card'>
                <div className='login-header'>
                    <div className='logo-container'>
                        <ion-icon name="chatbubbles"></ion-icon>
                    </div>
                    <h1>Welcome back!</h1>
                    <p>Log in to continue your conversations</p>
                </div>

                <form onSubmit={handleLoginSubmit} className='sign-in-form'>
                    <div className='form-group'>
                        <label htmlFor="userName">Username</label>
                        <div className='input-wrapper'>
                            <span className='input-icon'>
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <input 
                                type="text"
                                id="userName"
                                name='userName'
                                placeholder='Enter your username'
                                value={formData.userName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <div className='input-wrapper'>
                            <span className='input-icon'>
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </span>
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name='password'
                                placeholder='Enter your password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className='toggle-password'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <ion-icon name={showPassword ? "eye-off-outline" : "eye-outline"}></ion-icon>
                            </button>
                        </div>
                    </div>

                    <div className='form-options'>
                        <label className='remember-me'>
                            <input 
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className='checkbox-custom'></span>
                            <span className='remember-text'>Remember me</span>
                        </label>
                        <button 
                            type="button" 
                            className='forgot-password'
                            onClick={handleForgotPassword}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        className='signin-btn'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className='spinner'></span>
                                Logging in...
                            </>
                        ) : (
                            'Log In'
                        )}
                    </button>
                </form>

                {error && <p>{error}</p> }
                {message && <p>{message}</p> }

                <div className='divider'>
                    <span>or</span>
                </div>

                <div className='register-redirect'>
                    <p>Don't have an account? <button onClick={handleRegisterRedirect} className='register-link'>Sign up</button></p>
                </div>
            </div>
        </div>
    )
}

export default Login;