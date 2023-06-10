import React from "react";
import "./online.css";
import { Link } from "react-router-dom";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <li className="rightbarFriend">
        <div className="ridhtbarImgContainer">
          <Link to={`/profile/${user.username}`}>
            <img
              className="rightbarProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "userimg.jpg"
              }
              alt="img"
            ></img>
          </Link>
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
}
