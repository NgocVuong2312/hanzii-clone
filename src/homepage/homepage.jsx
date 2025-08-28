import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "primereact/button";
import { Image } from "primereact/image";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { caro, itemsList, volcapList } from "../MenuItem";
import { Layout, Card, Tag, Dropdown, Input } from "antd";
import { Carousel } from "primereact/carousel";

import { LeftOutlined, RightOutlined, ReadOutlined } from "@ant-design/icons";
import { ItemCard, CmtCard } from "../components/Card";

export default function Homepage() {
  const URL = "http://localhost:3002/tips";
  const CMT_URL = "http://localhost:3002/comments";
  const fetchComments = async () => {
    const response = await axios.get(CMT_URL);
    setComments(response.data);
  };
  const [commentLike, setCommentLike] = useState();
  const [commentDislike, setCommentDislike] = useState();
  useEffect(() => {
    fetchComments();
  }, []);
  const [comments, setComments] = useState([]);
  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    try {
      await axios.post(CMT_URL, {
        id: comments.length + 1,
        content: comment,
        userName: userName || "Khách",
        like: commentLike || 0,
        dislike: commentDislike || 0,
        likedUsers: [],
  dislikedUsers: [],
      });
      setComment(""); // clear input
      fetchComments(); // reload lại list
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddTip = async () => {
    if (tipsContent.trim() === "") return;
    try {
      const response = await axios.post(URL, {
        id: tips.length + 1,
        content: tipsContent,
      });
    } catch (error) {
      console.error("Error adding tip:", error);
    }
  };
  const [tips, setTips] = useState([]);
  const fetch = async () => {
    const response = await axios.get(URL);
    setTips(response.data);
  };
  const [tipsContent, setTipsContent] = useState("");
  useEffect(() => {
    fetch();
  }, []);
  const datedropdown = [
    {
      key: "1",
      label: "Hôm nay",
      onClick: () => setdate("Hôm nay"),
    },
    {
      key: "2",
      label: "Tuần này",
      onClick: () => setdate("Tuần này"),
    },
    {
      key: "3",
      label: "Tháng này",
      onClick: () => setdate("Tháng này"),
    },
  ];
  const [comment, setComment] = useState("");
  const [tipsVisible, setTipsVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [date, setdate] = useState("Ngày");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentItem, setCurrentItem] = useState("Han tu");
  const User = JSON.parse(localStorage.getItem("user"));
  console.log(tips);
  useEffect(() => {
    if (User) {
      setIsLogin(true);
      setUserName(User.username);
      if (User.role == "admin") {
        setIsAdmin(true);
      }
    } else {
      setIsLogin(false);
      setUserName("");
      setIsAdmin(false);
    }
  }, [User]);

  return (
    <div>
      <div className="m-4 flex flex-column align-items-center">
        {isLogin && <h2>Xin chào, {userName}</h2>}
        <div className="flex align-items-center flex-column w-full">
          <div className="d-flex align-items-center border-blue-400	border border-round-3xl px-3 py-2 shadow-sm m-auto  w-7 bg-white h-full">
            <i className="pi pi-search"></i>
            <input
              type="text"
              className="form-control border-0 shadow-none bg-transparent"
              placeholder="Nhập tiếng Trung"
            />
            <i className="pi pi-microphone "></i>
            <i className="pi pi-pencil"></i>
          </div>
          <div className="flex justify-content-center align-items-center mt-3">
            {itemsList.map((m) => (
              <a
                key={m.label}
                style={
                  currentItem === m.cont
                    ? { backgroundColor: "#47609f", color: "white" }
                    : {}
                }
                className="flex align-items-center gap-2 py-2 px-3 border-round-3xl no-underline cursor-pointer"
                onClick={() => setCurrentItem(m.cont)}
              >
                {m.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Layout style={{ backgroundColor: "#f0f2f5" }}>
        <div className="responsive-layout">
          {/* Cột trái */}
          <div className="column left-col">
            <Card className="border-round-2xl" title="Từ khóa hot" size="small">
              {currentItem}
            </Card>

            <Card className="border-round-2xl" title="Lịch sử" size="small">
              <p className="mb-0">Lịch sử</p>
              <div className="flex flex-column text-center">
                <Image
                  className="p-0"
                  src="/status.png"
                  alt="Image"
                  width="100px"
                  height="100px"
                />
                <p className="mb-0">Khong co du lieu</p>
              </div>
            </Card>

            <Card
              className="border-round-2xl"
              title="Từ vựng theo chủ đề"
              size="small"
              style={{ flex: 1 }}
            >
              <div>
                <ItemCard icon={"feelings.png"} cont={"..."} state="1" />
                <div className="grid">
                  <div className="col">
                    <ItemCard icon={"feelings.png"} cont={"..."} state="2" />
                    <ItemCard icon={"feelings.png"} cont={"..."} state="2" />
                  </div>
                  <div className="col">
                    <ItemCard icon={"feelings.png"} cont={"..."} state="2" />
                    <ItemCard icon={"feelings.png"} cont={"..."} state="2" />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, textAlign: "center" }}>
                <Button
                  icon={<LeftOutlined />}
                  size="small"
                  style={{ marginRight: 8 }}
                  text
                />
                <Button icon={<RightOutlined />} size="small" text />
              </div>
            </Card>
          </div>

          {/* Cột giữa */}
          <div className="column middle-col">
            <Card className="border-round-2xl" bodyStyle={{ padding: 0 }}>
              <Card
                className="border-round-2xl"
                bodyStyle={{
                  padding: 0,
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid #ccc",
                }}
              >
                <Carousel
                  value={caro}
                  numVisible={1}
                  numScroll={1}
                  autoplayInterval={3000}
                  circular
                  className="w-full"
                  showIndicators={false}
                  showNavigators={false}
                  itemTemplate={(item) => (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  )}
                />
              </Card>
            </Card>

            <Card
              className="border-round-2xl"
              title={"💡 Mẹo" + (tips.length > 0 ? ` (${tips.length})` : "")}
              size="small"
              style={{ flex: 1 }}
              onClick={() => {
                setTipsVisible(!tipsVisible);
              }}
            >
              {tips[0]?.content}
            </Card>

            <Card className="border-round-2xl" size="small">
              <strong>Từ vựng HSK</strong>
              <div style={{ marginTop: 12 }}>
                {volcapList.map((m) => (
                  <Tag key={m.label} color="green" style={{ marginBottom: 8 }}>
                    {m.label}
                  </Tag>
                ))}
              </div>
            </Card>
          </div>

          {/* Cột phải */}
          <div className="column right-col">
            <Card
              className="border-round-2xl"
              title="Bảng xếp hạng"
              size="small"
              extra={
                <Dropdown
                  menu={{ items: datedropdown }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Button trigger="click" size="small" text>
                    {date}
                  </Button>
                </Dropdown>
              }
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                height: 400,
              }}
            >
              {/* Phần danh sách comment */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {comments.map((cmt) => (
  <CmtCard
    key={cmt.id}
    id={cmt.id}
    cont={cmt.content}
    userName={cmt.userName}
    like={cmt.like}
    dislike={cmt.dislike}
    likedUsers={cmt.likedUsers || []}
    dislikedUsers={cmt.dislikedUsers || []}
    currentUser={userName}
  />
))}


              </div>

              {/* Ô nhập comment cố định */}
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <Input
                  placeholder="Nhập bình luận..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onPressEnter={handleAddComment}
                />
                <Button type="primary" onClick={handleAddComment}>
                  Gửi
                </Button>
              </div>
            </Card>

            <Card className="border-round-2xl" size="small">
              <p>
                <ReadOutlined /> <strong>Luyện đọc</strong>
              </p>
              <div style={{ textAlign: "right" }}>
                <Button
                  shape="circle"
                  icon={<RightOutlined />}
                  size="small"
                  text
                />
              </div>
            </Card>
          </div>
        </div>
        {/* CSS */}
        <style jsx>{`
          .responsive-layout {
            display: flex;
            gap: 16px;
          }
          .column {
            display: flex;
            flex-direction: column;
            gap: 16px;
          } /* Desktop order & size */
          .left-col {
            order: 1;
            flex: 1;
          }
          .middle-col {
            order: 2;
            flex: 2;
          }
          .right-col {
            order: 3;
            flex: 1;
          } /* Mobile */
          @media (max-width: 768px) {
            .responsive-layout {
              flex-direction: column;
            }
            .middle-col {
              order: 1;
              flex: 1;
            }
            .left-col {
              order: 2;
              flex: 1;
            }
            .right-col {
              order: 3;
              flex: 1;
            }
          }
        `}</style>{" "}
      </Layout>
      {tipsVisible && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Card
            className="border-round-2xl"
            title="💡 Mẹo"
            size="small"
            style={{ flex: 1 }}
            extra={
              <Button
                icon="pi pi-times"
                size="small"
                text
                onClick={() => setTipsVisible(false)}
              />
            }
          >
            {tips.map((tip) => (
              <p key={tip.id}>{tip.content}</p>
            ))}
            {isAdmin && (
              <div>
                <input
                  type="text"
                  value={tipsContent}
                  onChange={(e) => setTipsContent(e.target.value)}
                  placeholder="Add a new tip..."
                />
                <button onClick={handleAddTip}>Add</button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
