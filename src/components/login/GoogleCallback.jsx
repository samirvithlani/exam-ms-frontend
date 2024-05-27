import { useEffect } from "react";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

function GoogleCallback() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (token) {
      debugger
      // const decodedData = atob(token); // decode the string

    const decodetoken = jwtDecode(token)
console.log(decodetoken,"decode");
        Cookies.set("_id", decodetoken._id);

      Cookies.set("token", token);
      window.location.href = "/userDasboard";

    } else {
      // Handle error cases if token is not present
      console.error("Token not found in URL");
    }
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default GoogleCallback;
