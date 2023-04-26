import React, { useContext, useState } from 'react';

import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {

    const [error, setError] = useState('')

    const { logIn } = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const handleLogIn = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email , password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
        })
        .catch(error => {
            setError(error.message)
        })
        form.reset();
        navigate(from , { replace : true })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <input type="submit" value="Login" className='btn-login'/>
                <p><small>New to Ema-John? <Link to="/signup">Create an account!!</Link></small></p>
            </form>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default Login;