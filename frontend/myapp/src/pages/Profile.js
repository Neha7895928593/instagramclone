import React from 'react'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import './Profile.css'
import moreAction from '../images/horizontalMoreAction.PNG'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const API_BASE_URL = 'http://localhost:5000/api';



function Profile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const userProfilePic = userData ? userData.profilePic : null;
  const navigate = useNavigate()
  
  const user = useSelector(state => state.userReducer);
  
  

  //  const [image,setImage]=useState({preview:'',data:''})
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [mypost,setMypost]=useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPost, setShowPost] = useState(false);

  const handlePostClose = () => setShowPost(false);
  const handleShowPost = () => setShowPost(true);

  // const config_object={
  //   headers:{
  //     "Content-Type":"application/json",
  //     "Authorization":'Bearer'+localStorage.getItem('token')
  //   }


  // }




  // const handleFileSelect=(e)=>{
  // const img={preview:URL.createObjectURL(e.target.files[0]),
  //  data:e.target.files[0]
  // }
  // setImage(img)

  // }




  const [addcaption, setAddCaption] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const [postdetails,setPostdetails]=useState({})
  

   
  const showDetails=  async (Ipost)=>{
   setPostdetails(Ipost) 
   
   

  }
  
  
  
  const handleFileSelect = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      // localStorage.setItem('posts',JSON.stringify(selectedImage))
      // dispatch({type:'login_success',payload:response.data.user})

    }
  };
  const handleImageUpload = async () => {
    setLoading(true);
  
    try {
      if (!image) {
        // Check if an image is selected before attempting to upload
        setLoading(false);
        Swal.fire({
          icon: 'warning',
          title: 'No image selected',
          text: 'Please choose an image before creating a post.',
        });
        return;
      }
  
      let formData = new FormData();
      formData.append('image', image);
      formData.append('description', addcaption);
      formData.append('location', location);
  
      // Replace the following URL with the actual endpoint for creating a post
      const response = await axios.post(`${API_BASE_URL}/post/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
  
      setLoading(false);
  
      if (response.status === 200) {
        // Display a success message using SweetAlert2 or any other notification library
        Swal.fire({
          icon: 'success',
          title: 'Post created successfully!',
        });
  
        navigate('/posts');
      }
  
      // Optionally, you can clear the form fields after a successful post creation
      setAddCaption('');
      setLocation('');
      setImage(null); // Optionally, clear the image state or reset the file input
  
      // Optionally, you can return the response or perform other actions
      return response;
    } catch (error) {
      setLoading(false);
  
      // Handle errors, display an error message with details
      Swal.fire({
        icon: 'error',
        title: 'Error during post creation',
        text: error.response ? error.response.data.message : 'Please try again later.',
      });
  
      // Log the error to the console for debugging
      console.error('Error during post creation:', error);
    }
  };


  const myPost = async () => {
    
    try {
     
      const response = await axios.get(`${API_BASE_URL}/post/my-posts`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
     
      
       
      if (response.status === 200) {
       
        setMypost(response.data);
       
      }
    } catch (error) {
      
      console.error('Error fetching my posts:', error);
  
      
    }
  };
  const deletethispost = async (postID) => {
    try {
      
      const response = await axios.delete(`${API_BASE_URL}/post/${postID}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
  
      if (response.status === 200) {
       
        Swal.fire({
          icon: 'success',
          title: 'Post deleted successfully!',
        });
        myPost();
        setShow(false)
        
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete post',
        });
      }
    } catch (error) {
      
      console.error('Error deleting post:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error deleting post',
        text: error.response ? error.response.data.message : 'Please try again later.',
      });
    }
    }
  

  useEffect(() => {
    

    myPost();

    
  }, []); 
         
   
  const firstPost = mypost[0];
  return (
    <div className="container shadow mt-5  p-4">
      <div className="row">
        <div className="col-md-6 d-flex flex-column ">
        {userProfilePic  && (
                  <img
                  className='profilePic'
                   src={userProfilePic}
                  alt="Profile Pic"
                  />
                      )}
        {/* {firstPost && (
      <img className='profilePic' src={firstPost.author.profilePic} alt="profilePic" />
        )} */}
          
        {/* {mypost.map((details) => (
         <img key={details._id} className='profilePic' src={details.author.profilePic} alt="profilePic" />
          ))} */}

        <p className='ms-2 fs-5' >{user.user.fullName}</p>
          <p className='ms-2 fs-5' >{user.user.email}</p>
          <p className='ms-2 fs-6' >Full Stack Web Developer|Follow @{user.user.fullName}</p>
          <p className='ms-2 fs-6' >Bharat Institute of Technology</p>
          <a className='decoration-none ms-2 fs-6 ' href="www.linkedin.com/in/neha-rani-9a4160258">MyPortfolio</a>

        </div>
        <div className="col-6 d-flex flex-column justify-content-between ">
          <div className='d-flex  justify-content-equal rn mx-auto ' >
            <div className='bord  pe-4 pe-md-5 text-center fw-bold ' >
              <h6>{mypost.length}</h6>
              <p>Post</p>
            </div>
            <div className='bord  px-4 px-md-5 text-center fw-bold ' >
              <h6>20</h6>
              <p>Followers</p>
            </div>
            <div className='ps-4 ps-md-5 text-center fw-bold '>
              <h6>25</h6>
              <p>Following</p>
            </div>


          </div>


          <div className='mx-auto mt-md-0 mt-3 '>
            <button className='edit custom-btn custom-btn-white me-md-3' >
              <span className=' fs-6  ' >Edit Profile</span>
            </button>
            <button className=' edit custom-btn custom-btn-white me-md-3' onClick={handleShowPost}  >
              <span className=' fs-6  ' >Upload Post</span>
            </button>
          </div>


        </div>
      </div>
      <div className="row my-3  ">
        <div className="col-12">
          <hr />
        </div>
      </div>
      <div className='row mb-4 ' >
      {mypost.map((Ipost) => {
          return(
          <div className="col-md-4  col-sm-12 " key={Ipost._id}>
            <div className="card  shadow-lg rounded " onClick={handleShow} style={{ width: "20rem" }}>
            <img width={300} 
            src={`${API_BASE_URL}/post/${Ipost._id}/image`} 
            className="card-img-top" height={250} 
            alt={Ipost.description}
            onClick={()=>showDetails(Ipost)}
              style={{cursor:"pointer"}}
              
            />
             

          </div>
           
          </div>
          )
          })}
       
          
      </div>
      
      

      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>



        </Modal.Header>
        <Modal.Body>
          <div className="row">

            <div className="col-6">
              <div>
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={`${API_BASE_URL}/post/${postdetails._id}/image`}  className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="https://plus.unsplash.com/premium_photo-1672115680863-9353a690495a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8fDA%3D" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="https://images.unsplash.com/photo-1474112704314-8162b7749a90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" alt="..." />
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

            </div>

            <div className='col-6' >
              <div className="row">
                <div className="col-6 d-flex ">
                  <img className='profilepic p-2  ' src={ localStorage.getItem('user.profilePic')} alt={localStorage.getItem('user.profilePic')} />
                  {/* <img className='profilepic p-2' src={postdetails.author?.profilePic}
                   alt={postdetails.author?.fullName} /> */}
                  
                  
                  <div className='d-flex flex-column justify-content-center mt-2' >
                    <h6>{postdetails.location}</h6>
                    <p className='location' >{postdetails.description}</p>
                  </div>
                  <div className="dropdown ">
                    <a
                      className="btn"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={moreAction} alt="moreAction" />
                    </a>

                    <ul className="dropdown-menu border border-none ">
                      <li>

                        <a className="dropdown-item" href="#"> <i class="fa-solid fa-pen-to-square me-2 "></i>
                          Edit
                        </a>
                      </li>
                      <li>

                        <a onClick={()=>deletethispost(postdetails._id)} className="dropdown-item" href="#"> <i  class="fa-solid fa-trash me-2 "></i>
                          Delete
                        </a>
                      </li>

                    </ul>
                  </div>

                </div>

              </div>

              <div className="row">
                <div className="col-12">
                  <h6 className='text-muted p-2' >{moment(postdetails.createdAt).fromNow()}</h6>
                </div>
              </div>
              <div className="row">

                <div className="col-12 mt-2 ms-2 ">
                  <p></p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6  d-flex">
                  <i class="fa-regular fa-heart fs-3 ps-2 "></i>
                  <i class="fa-regular fa-comment  fs-3  ps-2"></i>
                  <i class="fa-solid fa-location-arrow fs-3 ps-2"></i>
                </div>
                <div className='row' >
                  <div className="col-12">
                    {/* <h6 className='mt-2 ms-2 ' > {postdetails.like.length} likes</h6> */}
                  </div>
                </div>
              </div>


            </div>

          </div>

        </Modal.Body>

      </Modal>

      <Modal show={showPost} size='lg' onHide={handlePostClose}>
        <Modal.Header closeButton>
          <span className='fw-bold fs-5 ' > Upload Post </span>


        </Modal.Header>
        <Modal.Body>

          <div className="row">
            <div className="col-md-6 col-sm-12 mb-3">
              <div className='upload-box'>
                <input
                  name='file'
                  type="file"
                  className='FileUpload'
                  id='drop_zone'
                  onChange={(e) => handleFileSelect(e)}
                  accept='.jpg,.png,.gif'
                />
                <div className="dropZoneOverlay">
                  {image && <img src={URL.createObjectURL(image)} width={200} height={150} className="img img-responsive" />}
                  <i className="fa-solid fa-cloud-arrow-up fs-1"></i> <br /> Upload photo from your computer
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between ">
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      value={addcaption}
                      onChange={(e) => setAddCaption(e.target.value)}
                      className="form-control"
                      placeholder="Add caption"
                      id="floatingTextarea2"
                      style={{ height: '50px' }}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Add caption</label>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-floating mb-3">
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder='Add location'
                    />
                    <label htmlFor="floatingInput">
                      <i className="fa-solid fa-location-dot pe-2"></i> Add location
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  {loading ? (
                    <div className="col-md-12 mt-3 text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (''

                  )}
                  <button onClick={handleImageUpload} className='custom-btn custom-btn-pink  float-end '   >
                    <span className='fs-4 ns fw-600'>Post</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  )
}

export default Profile