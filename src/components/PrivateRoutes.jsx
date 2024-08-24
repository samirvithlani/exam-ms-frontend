import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Login from "./login/Login";


const useAuth = () => {
  const [authState, setAuthState] = useState({ isLoggedin: false, role: null });

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role"); // Assuming the role is stored in a cookie

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
        case "student":
          if (
            role == "student" &&
            window.location.pathname.includes("userDasboard")
          ) {
            const currentPath = window.location.pathname;
            navigate(currentPath); // Redirect to student dashboard or any other route for students
          } else {
            navigate("/");
          }

          //navigate("/userDasboard"); // Redirect to student dashboard or any other route for students
          break;
        case "company":
          navigate("/company"); // Redirect to company dashboard or any other route for companies
          break;
        case "faculty":
          if (role == "faculty" && window.location.pathname.includes("facultyDashboard")) {
            const currentPath2 = window.location.pathname;
            navigate(currentPath2); // Redirect to faculty dashboard or any other route for faculty
          } else {
            
            navigate("/");
          }
          break;
        case "superAdmin":
          if (
            role == "superAdmin" &&
            window.location.pathname.includes("adminDashboard")
          ) {
            //toast.error("You don't have permission to access this page!");
            const currentPath1 = window.location.pathname;
            navigate(currentPath1); // Redirect to super admin dashboard or any other route for super admins
          } else {
            navigate("/");
          }
          break;
        default:
          navigate("/"); // Redirect to a default route if role is not recognized
          break;
      }
    }
  }, [isLoggedin, role, navigate]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("savedPath", window.location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  console.log(isLoggedin, role);

  return isLoggedin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};
