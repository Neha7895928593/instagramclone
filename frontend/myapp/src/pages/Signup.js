
import React, { useState } from 'react';
import image1 from '../images/image1.PNG';
import socialmobile from '../images/social-mobile.PNG';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signUp', formData);

            if (response.status === 201) {
                setLoading(false)
               
                Swal.fire({
                    icon: 'success',
                    title: 'User registered successfully',
                });
                
      
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                });
                navigate('/login')
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred. Please try again later.',
            });
        }
    };

    return (
        <>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
                        <img className="Desktop" style={{ height: '85%' }} src={image1} alt="" />
                        <img className="Mobile" src={socialmobile} alt="" />
                    </div>
                    <div className="col-md-5 col-sm-12">
                        <div className="card shadow-lg">
                            {loading ? (
                                <div className="col-md-12 mt-3 text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) :  (''
                                
                            )}
                            <div className="card-body  px-5">
                                <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
                                <form onSubmit={handleSignup}>
                                    <input
                                        type="text"
                                        className="p-2 mb-2 form-control input-bg"
                                        placeholder="Your fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />

                                    <input
                                        type="email"
                                        className="p-2 mb-2 form-control input-bg"
                                        placeholder="Phone number, username or email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                    <input
                                        type="password"
                                        className="p-2 mb-2 form-control input-bg"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <div className="mb-3 mt-2 d-grid">
                                        <button type="submit" className="custom-btn custom-btn-blue">
                                            Submit
                                        </button>
                                    </div>
                                    <div className="my-4">
                                        <hr className="text-muted" />
                                        <h5 className="text-muted text-center">OR</h5>
                                        <hr className="text-muted" />
                                    </div>
                                    <div className="mt-2 mb-5 d-grid">
                                        <button type="submit" className="custom-btn custom-btn-white">
                                            <span className="text-muted fs-6">
                                                Already have an account?
                                            </span>
                                            <Link to="/login" className="ms-1 text-info fw-bold">
                                                Log In
                                            </Link>
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

export default Signup;



// import React, { useState } from 'react'
// import image1 from '../images/image1.PNG'
// import socialmobile from '../images/social-mobile.PNG'
// import './signup.css'
// import { Link } from 'react-router-dom'
// import axios from 'axios'; 
// import { useNavigate } from 'react-router-dom'
// import sweetalert from 'sweetalert2'

// function Signup() {

//     const [fullName, setfullName] = useState('');
   
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading,setLoading]=useState(false)
//     const navigate=useNavigate()
    
//     // Function to handle form submission
//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setLoading(true)

//         // Perform signup logic using Axios
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/signUp', {
//                 fullName,
                
//                 email,
//                 password,
//             });

//             // Handle success or show error messages
//             if (response.status === 200) {
//                 setLoading(false)
//                 sweetalert.fire({
//                     icon:'success',
//                     title:'user registerd successfully',
                    
                    
//                 });
                
                

//                 // Redirect user to another page after successful signup
//             setEmail('')
//             setPassword('')
//             setfullName('') // You can use react-router-dom history or Redirect component
//                 // Example: history.push('/dashboard');
//             } 
            
           
            
//             else {
//                 // Handle error case, show error messages to the user
//                 console.error(response.data.error);
                
//             }
//         } catch (error) {
//             console.error('Error during signup:', error);
//             setLoading(false)
//             sweetalert.fire({
//                 icon:'error',
//                 title:'some error occur try later',
                
//             });
            
           
//         }
//     };
//     return (

//         <>
//             <div className="container login-container">
                
//                 <div className="row">
//                     <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center ">
//                         <img className='Desktop' style={{ height: "85%" }} src={image1} alt="" />
//                         <img className='Mobile' src={socialmobile} alt="" />

//                     </div>
//                     <div className="col-md-5 col-sm-12">
//                         <div className="card shadow">
//                             {loading?<div className='col-md-12 mt-3 text-center ' >
//                              <div className="spinner-border text-primary" role="status">
//                            <span className="visually-hidden">Loading...</span>
//                            </div>
//                             </div> : ''}
//                             <div className="card-body px-5">
//                                 <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
//                                 <form  onSubmit={handleSignup} >
//                                     <input
//                                         type="text"
//                                         className="p-2 mb-2 form-control input-bg"
//                                         placeholder="Your fullName"
//                                         value={fullName}
//                                         onChange={(e) => setfullName(e.target.value)}
//                                     />

//                                     <input type="email"
//                                      className="p-2  mb-2 form-control input-bg" 
//                                      placeholder='Phone number, username or email'
//                                      value={email}
//                                      onChange={(e) => setEmail(e.target.value)}
//                                      />

//                                     <input type="password"
//                                      className=" p-2  mb-2 form-control input-bg"
//                                       placeholder='Password'
//                                       value={password}
//                                       onChange={(e) => setPassword(e.target.value)}
//                                       />
                                      
//                                     <div className="mb-3  mt-2 d-grid">
//                                         <button type="submit" className=" custom-btn custom-btn-blue">Submit</button>
//                                     </div>
//                                     <div className='my-4'>
//                                         <hr className='text-muted' />
//                                         <h5 className='text-muted text-center'>OR</h5>
//                                         <hr className='text-muted' />
//                                     </div>
//                                     <div className='mt-2 mb-5 d-grid'>
//                                         <button type="submit" className="custom-btn custom-btn-white">
//                                             <span className='text-muted fs-6' >Already have an account?</span>
//                                             <Link to='/login' className='ms-1 text-info fw-bold'>Log In </Link>
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>


//                     </div>

//                 </div>
//             </div>


//         </>
//     )
// }

// export default Signup