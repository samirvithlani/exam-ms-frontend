import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const checkAuthToken = () => {
    
    const token = Cookies.get('token');
    console.log(token);
    if (!token) {
      return redirect("/login");
    }
    return true;
  };