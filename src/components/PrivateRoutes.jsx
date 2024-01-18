import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from './login/Login';

const useAuth = () => {
    const [isLoggedin, setisLoggedin] = useState(false);
  
    useEffect(() => {
      const token = Cookies.get('token');
      if (token !== null && token !== undefined) {
        setisLoggedin(true);
      }
    }, []);
  
    return isLoggedin;
  };

export const PrivateRoutes = () => {
    const navigate = useNavigate();
    const isAuth = useAuth()
  return isAuth ? <Outlet/>: <Login/>
};
