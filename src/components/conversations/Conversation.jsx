import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export default function Conversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(
          "https://socialmedia-rest-api.onrender.com/api/users?userId=" +
            friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const deleteConversation = async () => {};

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture ? PF + user?.profilePicture : PF + "userimg.jpg"
        }
        alt="conversation img"
      />
      <span className="conversationName">{user?.username || "username"}</span>
    </div>
  );
}
