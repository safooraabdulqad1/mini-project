import axios from "axios";
import React from "react";

const Profile = () => {
  const { username, email } = axios.get(
    "http://localhost:8000/api/user/signup"
  );
  return (
    <div>
      Username : {username} <br />
      Email : {email}
    </div>
  );
};

export default Profile;
