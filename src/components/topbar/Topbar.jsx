import React, { useContext } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../context/AuthContext";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  const logoutClick = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CHAMPIO</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search..." className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        {/*<div className="topbarLinks">
          <a href="/" className="topbarLinkHome">
            <span className="topbarLink">Home</span>
          </a>
          <span className="topbarLink">Timeline</span>
        </div>*/}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBage">1</span>
          </div>
          <div
            className="topbarIconItem"
            onClick={() => {
              navigate("/messenger", { replace: true });
            }}
          >
            <Chat />
            {/*<span className="topbarIconBage">2</span>*/}
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBage">1</span>
          </div>
          <div className="topbarIconItem" onClick={logoutClick}>
            <a className="topbarIconLogout" href="">
              <LogoutIcon />
            </a>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "userimg.jpg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
