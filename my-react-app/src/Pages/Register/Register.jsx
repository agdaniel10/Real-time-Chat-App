import { useState } from 'react'
import './Register.css'

const Register = () => {


    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }
    const handleSumbit = async () => {
        // Will handle the register form submission
    }

    return (
        <div className='register-main-container'>
            <h1>Creat your Kela-App account!</h1> 

            <div>
                <form onSubmit={handleSumbit} className='sign-up-form'>
                    <div className='form-group'>
                        <label htmlFor="userName">User Name</label>
                        <input 
                            type="text"
                            name='userName'
                            placeholder='Enter your user name'
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            name='email'
                            placeholder='email@example.com'
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Email</label>
                        <input 
                            type="password"
                            name='password'
                            placeholder='Enter your password'
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type='submit'
                        className='submit-btn'
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;