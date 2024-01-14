import React from 'react'
import logo from '../images/logo.PNG'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



function Navbar() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const userProfilePic = userData ? userData.profilePic : null;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer);

  function handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'error_user' });
    Swal.fire({
      icon: 'error',
      title: 'Log Out',
    });

    navigate('/login');
  }

  return (
    <>
      <nav className='navbar bg-light shadow-lg'>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={'/'}>
            <img alt="logo" src={logo} height="45px" />
          </NavLink>
          <form className="d-flex me-md-5 " role="search">
            <input className="searchbox form-control me-2 text-muted p-2" type="search" placeholder="Search" />

            <div className="nav-link text-dark fs-5 ps-2 mt-2" role="button">
              <i className=" searchIcon fa-solid fa-magnifying-glass"></i>
            </div>
            <NavLink className="nav-link text-dark fs-5 ps-2 " to='/posts'><i className="fa-solid fa-house"></i></NavLink>
            {localStorage.getItem('token')!=null? (
              <div className="nav-link text-dark fs-5 ps-2" role="button">
                <i className="fa-regular fa-heart"></i>
              </div>
            ) : (
              ''
            )}

            <div className="dropdown">
              {localStorage.getItem('token')!=null ? (
                <>
                  <div
                    role="button"
                    className="btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   {userProfilePic && (
                  <img
                     className="navbar-profile-pic"
                   src={userProfilePic}
                  alt="Profile Pic"
                  />
                      )}
                  </div>

                  <ul className="dropdown-menu border border-none">
                    <li>
                      <NavLink className="dropdown-item" to="/myprofile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <div  onClick={() => handleLogOut()} className="dropdown-item" role="button">
                        Log Out
                      </div>
                    </li>
                  </ul>
                </>
              ) : (
                ''
              )}
            </div>
          </form>
        </div>
      </nav>
    </>
  );
}





export default Navbar