import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Login from "../../components/login/Login";


const useAuth = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setisAuthenticated(true);
    }
  }, [location]);
  return isAuthenticated;
};
const ProtectedRoutes = () => {
  const isAuth = useAuth(); //true or false
  console.log(isAuth);
  //if isAuth is true then return Outlet else return LoginComponent
  return isAuth ? <Outlet /> : <Login />;
};
export default ProtectedRoutes;
