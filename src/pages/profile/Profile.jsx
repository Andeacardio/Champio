import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router";
import { PermMedia, Cancel } from "@mui/icons-material";
import { AuthContex } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState(null);
  const { user: currentUser } = useContext(AuthContex);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://socialmedia-rest-api.onrender.com/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const submitHandl = async (e) => {
    e.preventDefault();
    const newPhoto = {
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPhoto.profilePicture = fileName;

      try {
        await axios.post(
          "https://socialmedia-rest-api.onrender.com/api/upload",
          data
        );
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put(
        "https://socialmedia-rest-api.onrender.com/api/users/" + user._id,
        newPhoto
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const submitHand = async (e) => {
    e.preventDefault();
    const newPhoto = {
      userId: user._id,
    };
    if (files) {
      const data = new FormData();
      const fileName = files.name;
      data.append("file", files);
      data.append("name", fileName);
      newPhoto.coverPicture = fileName;

      try {
        await axios.post(
          "https://socialmedia-rest-api.onrender.com/api/upload",
          data
        );
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put(
        "https://socialmedia-rest-api.onrender.com/api/users/" + user._id,
        newPhoto
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture ? PF + user.coverPicture : PF + "post.jpg"
                  }
                  alt="profile img"
                ></img>
                <div className="UserPhotoAdd">
                  <label htmlFor="filess" className="shareOption">
                    {username === currentUser.username && (
                      <span className="shareOptionUserPhoto forCoverPicture">
                        +
                      </span>
                    )}
                    <input
                      type="file"
                      id="filess"
                      style={{ display: "none" }}
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => {
                        setFiles(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "userimg.jpg"
                  }
                  alt="user img"
                ></img>
              </div>
              <div className="UserPhotoAdd">
                <label htmlFor="files" className="shareOption">
                  {username === currentUser.username && (
                    <span className="shareOptionUserPhoto">+</span>
                  )}
                  <input
                    type="file"
                    id="files"
                    style={{ display: "none" }}
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
              <div>
                {file && (
                  <div className="shareImgContainer shareImgProfile">
                    <img
                      className="shareImg shareImgIcon"
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                    <Cancel
                      className="shareCancelImg CanselPhoto"
                      onClick={() => setFile(null)}
                    />
                    <button className="uploadButton" onClick={submitHandl}>
                      upload
                    </button>
                  </div>
                )}
                {files && (
                  <div className="shareImgContainer shareImgProfile filesContainer">
                    <img
                      className="shareImg shareImgIcon filesImg"
                      src={URL.createObjectURL(files)}
                      alt=""
                    />
                    <Cancel
                      className="shareCancelImg CanselPhoto"
                      onClick={() => setFiles(null)}
                    />
                    <button className="uploadButton" onClick={submitHand}>
                      upload
                    </button>
                  </div>
                )}
              </div>

              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <p className="profileInfoDesc">{user.desc}</p>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username={username} />
              <Rightbar user={user} />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
