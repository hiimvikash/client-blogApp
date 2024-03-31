import { Link, Navigate, useNavigate } from "react-router-dom"
import { useUserInfo } from "../context/UserContext"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Header() {
  const{userInfo, setUserInfo, setIsLoggedIn} = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyUser() {
      try {
        const response = await fetch('https://api-blogapp.onrender.com/user/verify', { credentials: 'include' });
        const rd = await response.json();
        if (!response.ok) {
          console.log(rd.message);
        } else {
          console.log("I am from header",rd.message);
          setUserInfo(rd.info);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    verifyUser(); // Call the async function immediately
  }, []);

  
  function logout(){
    // await fetch('https://api-blogapp.onrender.com/user/logout', {credentials: 'include'});
    setUserInfo({});
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/');
  }
  
  
  const username = userInfo?.username;
  return (
    <header>
        <Link to="/allblogs" className="logo">Blogefy</Link>
        <nav>
          {username && (
          <>
            <Link to="/create">Create Blog</Link>
            <Link to="/">My Blogs</Link>
            <a onClick={logout} style={{cursor:"pointer"}}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        </nav>
    </header>
  )
}

export default Header