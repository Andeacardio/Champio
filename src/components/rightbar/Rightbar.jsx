import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./rightbar.css";
import { Autoplay } from "swiper";
import Online from "../online/Online";
import axios from "axios";
import { AuthContex } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [friendsFollowers, setFriendsFollowers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContex);
  const r = user ? user._id : currentUser._id;
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `https://socialmedia-rest-api.onrender.com/api/users/friends/followings/${r}`
        );
        setFriends(friendList.data);
        setOnlineFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, r]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `https://socialmedia-rest-api.onrender.com/api/users/friends/followers/${r}`
        );
        setFriendsFollowers(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, r]);

  const handleCklick = async () => {
    try {
      if (followed) {
        await axios.put(
          "https://socialmedia-rest-api.onrender.com/api/users/" +
            user._id +
            "/unfollow",
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          "https://socialmedia-rest-api.onrender.com/api/users/" +
            user._id +
            "/follow",
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}present.png`} alt="img" />
          <span className="birthdayText">
            <b>{onlineFriends[0]?.username}</b> and <b>other 1 friend</b> have a
            birthday today.
          </span>
        </div>
        <div className="swiperright">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="rightbarAd" src={`${PF}2.jpg`} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="rightbarAd" src={`${PF}3.jpg`} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="rightbarAd" src={`${PF}5.jpg`} alt="img" />
            </SwiperSlide>
          </Swiper>
        </div>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {onlineFriends.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFolloButton" onClick={handleCklick}>
            {followed ? "Unfollow -" : "Follow +"}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Followings</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              className="rightbarFollowingLink"
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "userimg.jpg"
                  }
                  className="rightbarFollowingImg"
                  alt="user img"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <h4 className="rightbarTitle followers">Followers</h4>
        <div className="rightbarFollowings">
          {friendsFollowers.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              className="rightbarFollowingLink"
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "userimg.jpg"
                  }
                  className="rightbarFollowingImg"
                  alt="user img"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
