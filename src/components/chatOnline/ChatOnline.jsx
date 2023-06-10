import React, { useContext, useEffect, useState } from "react";
import "./chatOnline.css";
import { AuthContex } from "../../context/AuthContext";
import axios from "axios";

export default function ChatOnline() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContex);
  const r = currentUser?._id;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `https://socialmedia-rest-api.onrender.com/api/users/friends/followings/${r}`
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  const handlerClick = async (friend) => {
    // friend.preventDefault();
    try {
      const data = { senderId: currentUser._id, receiverId: friend._id };
      await axios.post(
        "https://socialmedia-rest-api.onrender.com/api/conversations",
        data
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div className="chatOnline">
      {friends.map((friend) => (
        <div
          className="chatOnlineFriend"
          onClick={() => {
            handlerClick(friend);
          }}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                friend.profilePicture
                  ? PF + friend.profilePicture
                  : PF + "userimg.jpg"
              }
              alt="chatOnlineImg"
            />
            {/*<div className="chatOnlineBadge "></div>*/}
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  );
}
