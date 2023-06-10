import React from "react";
import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own, user, currentChatUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own ? (
          <img
            className="messageImg"
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "userimg.jpg"
            }
            alt="messageimg"
          />
        ) : (
          <img
            className="messageImg"
            src={
              currentChatUser?.profilePicture
                ? PF + currentChatUser?.profilePicture
                : PF + "userimg.jpg"
            }
            alt="messageimg"
          />
        )}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
