import React from 'react';
import './card.css';
import moreAction from '../images/more-action.PNG';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const API_BASE_URL = 'http://localhost:5000/api';




function Card(props) {
  console.log(props.postData.author && props.postData.author.profilePic);



  const [userId, setUserId] = useState(null);
  const [commentbox, setCommentbox] = useState(false)
  const [comment, setComment] = useState('')


  const likedislikepost = async (postId, type) => {
    try {
      let url = '';
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };

      if (type === 'like') {
        url = `${API_BASE_URL}/post/${postId}/like`;
      } else if (type === 'unlike') {
        url = `${API_BASE_URL}/post/${postId}/unlike`;
      } else {
        console.error('Invalid type:', type);
        return;
      }

      const response = await axios.post(url, {}, config);

      if (response.status === 200 && type === 'like') {
        props.getAllPost();
      } else if (type === 'like' && response.status === 400 && response.data.message === 'Post already liked') {
        Swal.fire({
          icon: 'error',
          title: 'Post already liked',
        });
      } else if (response.status === 200 && type === 'unlike') {
        props.getAllPost();
      } else {
        console.error(`Error ${type}ing post:`, response.data.message);
      }
    } catch (error) {
      console.error(`Error ${type}ing post:`, error);
    }
  };
  const submitComment = async (postId) => {
    setCommentbox(false)

    try {

      const response = await axios.post(
        `${API_BASE_URL}/post/${postId}/comment`,
        { text: comment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      if (response.status === 201) {

        props.getAllPost();
      } else {
        console.error('Error adding comment:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }




  //   if(type=='like'){
  //   try {
  //     const response = await axios.post(

  //       `${API_BASE_URL}/post/${postId}/like`, {},
  //       // No request data, as it's a simple like action
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + localStorage.getItem('token'),
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       props.getAllPost()
  //     }

  //     else if (response.status === 400  && response.data.message === 'Post already liked' ) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Post already liked',
  //       });


  //     }
  //     else {
  //       console.error('Error liking post:', response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error liking post:', error);
  //   }
  // }
  // if(type=='unlike'){
  //   try {
  //     const response = await axios.post(
  //       `${API_BASE_URL}/post/${postId}/unlike`,
  //       {}, // An empty body for a POST request
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + localStorage.getItem('token'),
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       props.getAllPost();
  //       // Update your local state or fetch posts again from the server
  //       // to reflect the new unlike status
  //       // For example, you might have a posts state and update it accordingly
  //       // setPosts(newPosts);
  //     } else {
  //       console.error('Error unliking post:', response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error unliking post:', error);
  //   }

  // }
  // };



  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {

      setUserId(storedUser.id);
    }

  }, []);




  return (
    <div className='card  shadow-lg rounded'>
      <div className='card-body   shadow-lg px-2'>
        <div className='row'>
          <div className='col-6 d-flex'>
            <img 
              className='profilepic p-2'
              src={props.postData.author && props.postData.author.profilePic ? props.postData.author.profilePic : 'default-profile-pic-url'}
              alt={props.postData.description}
            />

            <div className='d-flex flex-column justify-content-center mt-2'>
              <h6>{props.postData.location}</h6>
              <p className='location'>{props.postData.description}</p>
            </div>
          </div>


          {props.postData.author && props.postData.author._id === userId ? (
            <div className='col-6'>
              <img 
                className='float-end fs-2 mt-2 p-2'
                src={moreAction}
                alt={props.postData.description}
                onClick={() => props.deletePost(props.postData._id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='row'>
          <div className='col-12'>
            <img height={200} width={300}
              
              style={{ borderRadius: '15px' }}
              className='img-fluid rounded p-2'
              src={`http://localhost:5000/api/post/${props.postData._id}/image`}
              alt={props.postData.description}
            />
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-6 d-flex'>





            <i onClick={() => likedislikepost(props.postData._id, 'like')}
              className='fa-regular fa-thumbs-up fs-3 ps-2'></i>
            <i onClick={() => likedislikepost(props.postData._id, 'unlike')}
              className="fa-regular fa-thumbs-down fs-3 ps-2"></i>
            <i onClick={() => setCommentbox(true)}
              className='fa-regular fa-comment fs-3 ps-2'>

            </i>

          </div>
          <div className='col-6'>
            <h6 className='float-end'>{props.postData.like.length} likes</h6>
          </div>
        </div>
        {commentbox ? (
          <>
            <div className='row'>
              <div className='col-9'>
                <textarea onChange={(e) => setComment(e.target.value)} className='form-control mt-2 mb-2'></textarea>
              </div>
              <div className='col-3'>
                <button className='btn btn-primary mt-3 ' onClick={() => submitComment(props.postData._id)} type='submit'>Send</button>
              </div>
            </div>
          </>
        ) : ''}
        {props.postData.comments.map((comm) => {

          return (
            <div className='row'>
              <div className='col-12'>
                <p> {comm.text}- <b>{comm.commentedBy.fullName}</b></p>
              </div>
            </div>
          )

        })}


        <div className='row'>
          <div className='col-12'>
            <h6 className='text-muted p-2'>{moment(props.postData.createdAt).fromNow()}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;






