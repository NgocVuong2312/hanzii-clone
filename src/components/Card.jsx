import React, { useEffect } from "react";
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
export const CmtCard = ({ id, currentUser }) => {
  const getCMT_URL = "http://localhost:8080/api/comments/get/";
  const patchCMT_URL = "http://localhost:8080/api/comments/update/";
  const getUserUrl = `http://localhost:8080/api/users/get/`;
  const [comments, setComments] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const [user, setUser] = useState("Khách");

  const fetchComments = async () => {
    try {
      const response = await axios.get(getCMT_URL + id);
      const data = response.data.data[0];
      setComments(data[0]);
      setLikedUsers(data[0].LIKEDUSERS||[]);
      setDislikedUsers(data[0].DISLIKEDUSERS||[]);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(getUserUrl + comments.UID);
      const data = response.data.data[0];
      setUser(data[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
      return "Khách";
    }
  };
  useEffect(() => {
    if (comments.UID) {
      fetchUsers();
    }
  }, [comments]);
  const handleLike = async () => {
    let updatedLikes = likedUsers;
    let updatedDislikes = dislikedUsers;

    // Nếu đang dislike thì bỏ khỏi dislike
    if (updatedDislikes.includes(currentUser)) {
      updatedDislikes = updatedDislikes.filter((u) => u !== currentUser);
      setDislikedUsers(updatedDislikes);
      await axios.patch(patchCMT_URL + id, {
        DISLIKEDUSERS: JSON.stringify(updatedDislikes),
      });
    }

    // Toggle like
    if (updatedLikes.includes(currentUser)) {
      updatedLikes = updatedLikes.filter((u) => u !== currentUser);
    } else {
      updatedLikes = [...updatedLikes, currentUser];
    }

    setLikedUsers(updatedLikes);
    await axios.patch(patchCMT_URL + id, {
      LIKEDUSERS: JSON.stringify(updatedLikes),
    });
  };

  const handleDislike = async () => {
    let updatedLikes = likedUsers;
    let updatedDislikes = dislikedUsers;

    // Nếu đang like thì bỏ khỏi like
    if (updatedLikes.includes(currentUser)) {
      updatedLikes = updatedLikes.filter((u) => u !== currentUser);
      setLikedUsers(updatedLikes);
      await axios.patch(patchCMT_URL + id, {
        LIKEDUSERS: JSON.stringify(updatedLikes),
      });
    }

    // Toggle dislike
    if (updatedDislikes.includes(currentUser)) {
      updatedDislikes = updatedDislikes.filter((u) => u !== currentUser);
    } else {
      updatedDislikes = [...updatedDislikes, currentUser];
    }

    setDislikedUsers(updatedDislikes);
    await axios.patch(patchCMT_URL + id, {
      DISLIKEDUSERS: JSON.stringify(updatedDislikes),
    });
  };

  return (
    <div className="flex flex-column border-bottom-1 py-2">
      {/* <button
        onClick={() => {
          console.log(likedUsers, dislikedUsers);
        }}
      >
        Log Comments
      </button> */}
      <p className="m-0">{comments.CONTENT}</p>
      <div className="flex flex-row align-items-center justify-content-between gap-4 mt-1">
        <div className="flex flex-row align-items-center gap-3">
          <i
            className={`pi pi-thumbs-up `}
            style={{ fontSize: "1rem", cursor: "pointer" }}
            onClick={handleLike}
          />
          <p className="m-0">{likedUsers?.length || 0}</p>

          <i
            className={`pi pi-thumbs-down `}
            style={{ fontSize: "1rem", cursor: "pointer" }}
            onClick={handleDislike}
          />
          <p className="m-0">{dislikedUsers?.length||0}</p>
        </div>
        <p className="m-0 text-sm text-gray-600">{user.USERNAME}</p>
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
