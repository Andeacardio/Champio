import "./post.css";
import { MoreVert } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContex } from "../../context/AuthContext";

export default function Post({ post, postId }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContex);

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://socialmedia-rest-api.onrender.com/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(
        "https://socialmedia-rest-api.onrender.com/api/posts/" +
          post._id +
          "/like",
        { userId: currentUser._id }
      );
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setisLiked(!isLiked);
  };
  const deletePost = async () => {
    try {
      await axios.delete(
        "https://socialmedia-rest-api.onrender.com/api/posts/" + post._id,
        { userId: currentUser._id }
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    // console.log(post._id);
    // console.log(post.userId);
    // console.log(currentUser._id);
  };

  return (
    <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
          <Link to={`profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={
                user.profilePicture ? PF + user.profilePicture : PF + "userimg.jpg"
              }
              alt="img"
            />
          </Link>
          <span className="postUserName">{user.username}</span>

          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
          {post.userId === currentUser._id && (
            <CloseIcon onClick={deletePost} />
          )}
          <MoreVert />
        </div>
      </div>
      <div className="postCenter">
        <span className="postText">{post?.desc}</span>
        <img
          className="postImg"
          src={PF + post.img || PF + "post.jpg"}
          alt="img"
        />
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          <img
            className="likeIcon"
            src={`${PF}like.png`}
            onClick={likeHandler}
            alt="img"
          />
          <img
            className="likeIcon"
            src={`${PF}heart.png`}
            onClick={likeHandler}
            alt="img"
          />
          <span className="postLikeCounter"> {like} people like it</span>
        </div>
        <div className="postBottomRight">
          <span className="postCommentText">{post?.comment} comments</span>
        </div>
      </div>
    </div>
  );
}
