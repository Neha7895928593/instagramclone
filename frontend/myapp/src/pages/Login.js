import React, { useState } from 'react';
import axios from 'axios';
import image1 from '../images/image1.PNG';
import socialmobile from '../images/social-mobile.PNG';
import './login.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import {useDispatch} from 'react-redux'

import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            
            

           
            if (response.status === 200) {
                setLoading(false)
                localStorage.setItem('token', response.data.token);

                localStorage.setItem('user', JSON.stringify(response.data.user));
                
  
                  dispatch({type:'login_success',payload:response.data.user})
                  
                  
                Swal.fire({
                    icon: 'success',
                    title: 'User login successfully',
                });
                setLoading(false)
                
                 navigate('/myprofile')
                
                
            } else {
               
                console.error(response.data.error);
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred. Please try again later.',
            });
            console.error('Error during login:', error);
        }

        
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
                        <img className='Desktop' style={{ height: "85%" }} src={image1} alt="" />
                        <img className='Mobile' src={socialmobile} alt="" />
                    </div>
                    <div className="col-md-5 col-sm-12">
                        <div className="card shadow-lg">
                        {loading ? (
                                <div className="col-md-12 mt-3 text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (''
                                
                            )}
                            <div className="card-body px-5">
                                <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
                                <form onSubmit={handleLogin}>
                                    <input
                                        type="email"
                                        className="p-2 mt-4 mb-2 form-control input-bg"
                                        placeholder='Phone number, username or email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <input
                                        type="password"
                                        className="p-2 mt-4 mb-2 form-control input-bg"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <div className="mb-3 mt-4 d-grid">
                                        <button type="submit" className="custom-btn custom-btn-blue">Submit</button>
                                    </div>
                                    <div className='my-4'>
                                        <hr className='text-muted' />
                                        <h5 className='text-muted text-center'>OR</h5>
                                        <hr className='text-muted' />
                                    </div>
                                    <div className='mt-3 mb-5 d-grid'>
                                        <button type="submit" className="custom-btn custom-btn-white">
                                            <span className='text-muted fs-6' >Don't have an account?</span>
                                            <Link to='/signup' className='ms-1 text-info fw-bold'>Sign Up </Link>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
