import React from "react";
import "./online.css";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <li className="rightbarFriend">
        <div className="ridhtbarImgContainer">
          <img
            className="rightbarProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "userimg.jpg"
            }
            alt="img"
          ></img>
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
}
