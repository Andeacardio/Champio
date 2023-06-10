import "./messanger.css";
import Topbar from "../../components/topbar/Topbar";
import React, { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContex } from "../../context/AuthContext";
import axios from "axios";
// import { io } from "socket.io-client";
import CloseIcon from "@mui/icons-material/Close";

export default function Messenger() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessages] = useState("");
  // const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContex);
  const scrollRef = useRef();

  // useEffect(() => {
  //   setSocket(io("ws://localhost:8900"));
  // }, []);

  useEffect(() => {
    const getConversatios = async () => {
      try {
        const res = await axios.get(
          "https://socialmedia-rest-api.onrender.com/api/conversations/" +
            user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversatios();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "https://socialmedia-rest-api.onrender.com/api/messages/" +
            currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
    const interval = setInterval(() => {
      getMessages();
      console.log("messages updated");
    }, 10000);
    return () => clearInterval(interval);
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "https://socialmedia-rest-api.onrender.com/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessages("");
      const audio = new Audio(PF + "/1.mp3");
      if (currentChat) {
        audio.play();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, PF, currentChat]);

  useEffect(() => {
    const getChatUser = async () => {
      const chatUser = currentChat?.members[1];
      try {
        const user = await axios.get(
          "https://socialmedia-rest-api.onrender.com/api/users/" + chatUser
        );

        setCurrentChatUser(user.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChatUser();
  }, [currentChat]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              className="chatMenuInput"
              placeholder="Search for a friends..."
            />
            <span className="chatMenuText">Conversations</span>
            {conversations.map((c) => (
              <div className="chatMenuConversation">
                <div className="chatMenuItem" onClick={() => setCurrentChat(c)}>
                  <Conversation
                    conversation={c}
                    currentUser={user}
                    key={c._id}
                  />
                </div>
                <div
                  className="chatMenuClose"
                  onClick={async () => {
                    console.log(c._id);
                    try {
                      await axios.delete(
                        "https://socialmedia-rest-api.onrender.com/api/conversations/" +
                          c._id
                      );
                    } catch (err) {
                      console.log(err);
                    }
                    window.location.reload();
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxHeader">
                  <div>
                    <img
                      className="chatBoxHeaderImg"
                      src={
                        currentChatUser?.profilePicture
                          ? PF + currentChatUser?.profilePicture
                          : PF + "userimg.jpg"
                      }
                      alt="userImg"
                    />
                  </div>
                  <div className="chatBoxTitle">
                    {currentChatUser?.username}
                  </div>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        user={user}
                        currentChatUser={currentChatUser}
                        key={m._id}
                      />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write your message"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessage}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a chat on the left side to start conversation
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <span className="chatOnlineTitle">Your followings</span>
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
