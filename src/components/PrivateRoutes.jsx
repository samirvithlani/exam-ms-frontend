import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from './login/Login';

const useAuth = () => {
    const [authState, setAuthState] = useState({ isLoggedin: false, role: null });
  
    useEffect(() => {
        const token = Cookies.get('token');
        const role = Cookies.get('role'); // Assuming the role is stored in a cookie

        if (token !== null && token !== undefined) {
            setAuthState({ isLoggedin: true, role });
        }
    }, []);
  
    return authState;
};

export const PrivateRoutes = () => {
    const navigate = useNavigate();
    const { isLoggedin, role } = useAuth();

    useEffect(() => {
        if (isLoggedin && role) {
            switch (role) {
                case 'student':
                    navigate('/userDasboard'); // Redirect to student dashboard or any other route for students
                    break;
                case 'company':
                    navigate('/company'); // Redirect to company dashboard or any other route for companies
                    break;
                case 'faculty':
                    navigate('/facultyDashboard'); // Redirect to faculty dashboard or any other route for faculty
                    break;
                case 'superAdmin':
                    navigate('/adminDashboard'); // Redirect to super admin dashboard or any other route for super admins
                    break;
                default:
                    navigate('/'); // Redirect to a default route if role is not recognized
                    break;
            }
        }
    }, [isLoggedin, role, navigate]);

    return isLoggedin ? <Outlet /> : <Login />;
};
