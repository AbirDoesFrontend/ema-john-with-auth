import React, { useContext, useState } from 'react';

import './Signup.css';
import { Link } from 'react-router-dom';
import { AuhtContext } from '../context/AuthProvider';

const Signup = () => {

    const { createUser } = useContext(AuhtContext)

    const [error, setError] = useState('')

    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        setError('');
        if(password != confirm) {
            setError("Your password didn't match")
            return
        } else if(password.length < 6){
            setError("Password must contain 6 characters")
        }

        createUser(email , password)
        .then(result => {
            const signedUpUser = result.user;
            console.log(signedUpUser)
        })
        .catch(error => {
            setError(error.message)
        })

        form.reset()
    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confrim password</label>
                    <input type="password" name="confirm" id="" required />
                </div>
                <input type="submit" value="Sign Up" className='btn-login' />
                <p><small>Already have an account? <Link to="/login">Login!</Link></small></p>
            </form>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default Signup;