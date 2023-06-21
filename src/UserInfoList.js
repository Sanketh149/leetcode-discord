import React from "react";

const UserInfoList = () => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : [];

  return (
    <div>
      <h2>User Info List</h2>
      {userInfo.length > 0 ? (
        <ul>{userInfo.toString()}</ul>
      ) : (
        <p>No user info found.</p>
      )}
    </div>
  );
};

export default UserInfoList;
