import React from "react";
import { useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { Card } from "antd";
import { HeartOutlined, CommentOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

export const ItemCard = ({ icon, cont, state }) => {
  const imgSize = state === "1" ? "48px" : "24px";

  return (
    <div
      className="flex flex-row align-items-center h-auto w-full gap-2 border border-round-xl p-2 mb-1 h-3rem"
      style={{
        backgroundColor: "lightgray",
      }}
    >
      <img style={{ height: imgSize, width: imgSize }} src={icon}></img>
      <p>{cont}</p>
    </div>
  );
};
export const CmtCard = ({ id, cont, userName, like, dislike, likedUsers = [], dislikedUsers = [], currentUser }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [liked, setLiked] = useState(likedUsers.includes(currentUser));
  const [disliked, setDisliked] = useState(dislikedUsers.includes(currentUser));
  console.log(currentUser);
  
  const CMT_URL = "http://localhost:3002/comments";

  const updateDB = async (newLike, newDislike, newLikedUsers, newDislikedUsers) => {
    try {
      await axios.patch(`${CMT_URL}/${id}`, {
        like: newLike,
        dislike: newDislike,
        likedUsers: newLikedUsers,
        dislikedUsers: newDislikedUsers,
      });
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const handleLike = () => {
    let newLike = likeCount;
    let newDislike = dislikeCount;
    let newLikedUsers = [...likedUsers];
    let newDislikedUsers = [...dislikedUsers];

    if (liked) {
      newLike -= 1;
      newLikedUsers = newLikedUsers.filter((u) => u !== currentUser);
      setLiked(false);
    } else {
      newLike += 1;
      newLikedUsers.push(currentUser);
      if (disliked) {
        newDislike -= 1;
        newDislikedUsers = newDislikedUsers.filter((u) => u !== currentUser);
        setDisliked(false);
      }
      setLiked(true);
    }

    setLikeCount(newLike);
    setDislikeCount(newDislike);

    updateDB(newLike, newDislike, newLikedUsers, newDislikedUsers);
  };

  const handleDislike = () => {
    let newLike = likeCount;
    let newDislike = dislikeCount;
    let newLikedUsers = [...likedUsers];
    let newDislikedUsers = [...dislikedUsers];

    if (disliked) {
      newDislike -= 1;
      newDislikedUsers = newDislikedUsers.filter((u) => u !== currentUser);
      setDisliked(false);
    } else {
      newDislike += 1;
      newDislikedUsers.push(currentUser);
      if (liked) {
        newLike -= 1;
        newLikedUsers = newLikedUsers.filter((u) => u !== currentUser);
        setLiked(false);
      }
      setDisliked(true);
    }

    setLikeCount(newLike);
    setDislikeCount(newDislike);

    updateDB(newLike, newDislike, newLikedUsers, newDislikedUsers);
  };

  return (
    <div className="flex flex-column border-bottom-1 py-2">
      <p className="m-0">{cont}</p>
      <div className="flex flex-row align-items-center justify-content-between gap-4 mt-1">
        <div className="flex flex-row align-items-center gap-3">
          <i
            className={`pi pi-thumbs-up ${liked ? "text-primary" : ""}`}
            style={{ fontSize: "1rem", cursor: "pointer" }}
            onClick={handleLike}
          />
          <p className="m-0">{likeCount}</p>

          <i
            className={`pi pi-thumbs-down ${disliked ? "text-primary" : ""}`}
            style={{ fontSize: "1rem", cursor: "pointer" }}
            onClick={handleDislike}
          />  
          <p className="m-0">{dislikeCount}</p>
        </div>
        <p className="m-0 text-sm text-gray-600">{userName}</p>
      </div>
    </div>
  );
};


export const PostCard = ({ name, date, cont }) => {
  return (
    <div>
      <Card
        title={
          <div className="flex flex-row align-items-center">
            <img
              src="/logo.png"
              alt="Image"
              width="30px"
              height="30px"
              style={{ borderRadius: "50%" }}
              className="mr-3 border-round-3xl"
            />
            <div className="flex flex-column">
              <div>{name}</div>
              <div>{date}</div>
            </div>
          </div>
        }
        actions={[
          <div className="text-xl flex flex-row justify-content-between mx-8">
            <HeartOutlined key="like" />
            <CommentOutlined key="comment" />
            <EyeOutlined key="watch" />
          </div>,
        ]}
      >
        {cont}
      </Card>
    </div>
  );
};
