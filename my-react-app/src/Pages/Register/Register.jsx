import { useState } from 'react'
import './Register.css'
import AuthService from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const {
        isLoading,
        message,
        error,
        clearMessages,
        handleRegister,
    } = AuthService()

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()


    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // clear previous messages
        clearMessages()

        if (!formData.userName || !formData.email || !formData.password) {
            alert("Please fill in all required fields");
            return 
        }

        await handleRegister(formData)
        
        // Your registration logic here
        console.log('Form submitted:', formData);
    }

    const handleLoginRedirect = () => {
        navigate('/login')
        console.log('Redirect to login');
    }

    return (
        <div className='register-main-container'>
            <div className='register-card'>
                <div className='register-header'>
                    <div className='logo-container'>
                        <ion-icon name="chatbubbles"></ion-icon>
                    </div>
                    <h1>Create an account!</h1> 
                    <p>Welcome to Kela-app! Kindly enter your details</p>
                </div>

                <form onSubmit={handleSubmit} className='sign-up-form'>
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
                        <label htmlFor="email">Email</label>
                        <div className='input-wrapper'>
                            <span className='input-icon'>
                                <ion-icon name="mail-outline"></ion-icon>
                            </span>
                            <input 
                                type="email"
                                id="email"
                                name='email'
                                placeholder='email@example.com'
                                value={formData.email}
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

                    <button
                        type='submit'
                        className='submit-btn'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className='spinner'></span>
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}

                </form>

                <div className='divider'>
                    <span>or</span>
                </div>

                <div className='login-redirect'>
                    <p>Already have an account? <button onClick={handleLoginRedirect} className='login-link'>Login</button></p>
                </div>
            </div>
        </div>
    )
}

export default Register;