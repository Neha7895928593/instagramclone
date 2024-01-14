import Login from './pages/Login';
import './App.css';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Postoverviews from './pages/Postoverviews';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Swal from 'sweetalert2';


function App() {
  function DynamicRoute() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        dispatch({ type: 'login_success', payload: userData });
        navigate('/posts')
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'error_user' });
        Swal.fire({
          icon: 'error',
          title: 'Log Out',
        });

        navigate('/login');
      }
    }, []);

    return (
      <>
        {/* Your JSX elements go here */}
        <Routes>
          <Route path="/" element={<Postoverviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Postoverviews />} />
          <Route path="/myprofile" element={<Profile />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Router>
        <Navbar />
        <DynamicRoute />
      </Router>
    </>
  );
}

export default App;
