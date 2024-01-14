import React, { useState, useEffect } from 'react';
import axios from 'axios';

 import Swal from 'sweetalert2';
import Card from '../component/Card';

const localurl='http://localhost:5000/api'
function Postoverviews() {
  const [posts, setPosts] = useState([]);
  
 
  const getAllPost = async () => {
    try {
      const response = await axios.get(`${localurl}/post`);

      if (response.status === 200) {
        setPosts(response.data.data);
      }
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    
  };
     
const deletePost = async (postId) => {
  try {
    
    const response = await axios.delete(`${localurl}/post/${postId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    if (response.status === 200) {
      
      Swal.fire({
        icon: 'success',
        title: 'Post deleted successfully!',
      });
      getAllPost()
      
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
    

    getAllPost();

   
  }, []);

  


  return (
    <div className="container mt-md-5 mt-3">
      <div className="row">
        {posts.map((post) => {
          return(
          <div className="col-md-4 mb-2" key={post._id}>
            <Card postData={post}  deletePost={deletePost}  getAllPost={getAllPost}  />
          </div>
          )
          })}
      </div>
    </div>
  );
}

export default Postoverviews;






