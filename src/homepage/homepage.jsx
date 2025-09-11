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
  const VOLCAP_URL = "http://localhost:3002/volcap";
  const USER_URL = "http://localhost:3002/User";
  const getUserUrl = (id) => `http://localhost:8080/api/users/get/${id}`;
  const VCH_URL = "http://localhost:3002/VolcapHistory";

  const [currentVolcap, setCurrentVolcap] = useState([]);
  const [comments, setComments] = useState([]);
  const [tips, setTips] = useState([]);
  const [tipsContent, setTipsContent] = useState("");
  const [comment, setComment] = useState("");
  const [tipsVisible, setTipsVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [date, setDate] = useState("Ngày");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentItem, setCurrentItem] = useState("Tu Vung");
  const [vocapHistory, setVocapHistory] = useState([]);
  const [vch, setVCH] = useState();
  const [validHis, setValidHis] = useState(false);
  const [User, setUser] = useState();
  const [volcab, setVolcab] = useState();

  const Userid = JSON.parse(localStorage.getItem("user"));
  const UID = Userid?.userid;

  // Fetch comments
  const fetchComments = async () => {
    const response = await axios.get(CMT_URL);
    setComments(response.data);
  };

  const fetchVolcab = async () => {
    const response = await axios.get(VOLCAP_URL);
    setVolcab(response.data);
  };
  useEffect(() => {
    fetchVolcab();
  }, []);
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchVCH = async () => {
    try {
      const response = await axios.get(VCH_URL);
      let finduid = response.data.find((h) => h?.userid === UID);

      if (!finduid) {
        const newRes = await axios.post(VCH_URL, { userid: UID, VCH: [] });
        finduid = newRes.data;
      }

      setVCH(finduid);
      setVocapHistory(finduid.VCH || []);
      setValidHis(!!finduid?.VCH?.length);
    } catch (err) {
      console.error("Error fetching VCH:", err);
    }
  };

  useEffect(() => {
    if (UID) fetchVCH();
  }, [UID]);

  const addVCH = async () => {
    if (!vch?.id) return;
    try {
      await axios.patch(`${VCH_URL}/${vch.id}`, {
        VCH: vocapHistory,
      });
      setVCH((prev) => ({ ...prev, VCH: vocapHistory }));
      setValidHis(vocapHistory.length > 0);
    } catch (err) {
      console.error("Error updating VCH:", err);
    }
  };

  useEffect(() => {
    if (vocapHistory.length > 0) {
      addVCH();
    }
  }, [vocapHistory]);
  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    try {
      await axios.post(CMT_URL, {
        id: comments.length + 1,
        content: comment,
        userName: userName || "Khách",
        like: 0,
        dislike: 0,
        likedUsers: [],
        dislikedUsers: [],
      });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Add tip
  const handleAddTip = async () => {
    if (tipsContent.trim() === "") return;
    try {
      await axios.post(URL, {
        id: tips.length + 1,
        content: tipsContent,
      });
      setTipsContent("");
      fetchTips(); // gọi lại API sau khi thêm tip
    } catch (error) {
      console.error("Error adding tip:", error);
    }
  };

  // Fetch tips
  const fetchTips = async () => {
    const response = await axios.get(URL);
    setTips(response.data);
  };

  useEffect(() => {
    fetchTips();
  }, []);

  // Date dropdown
  const datedropdown = [
    { key: "1", label: "Hôm nay", onClick: () => setDate("Hôm nay") },
    { key: "2", label: "Tuần này", onClick: () => setDate("Tuần này") },
    { key: "3", label: "Tháng này", onClick: () => setDate("Tháng này") },
  ];

  // Fetch user
  const handleUser = async () => {
    try {
      const response = await axios.get(getUserUrl(UID));
      const getData = response.data.data[0];
      setUser(getData[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    handleUser();
  }, [isLogin]);

  useEffect(() => {
    if (User) {
      setIsLogin(true);
      setUserName(User.USERNAME || "");
      setIsAdmin(User.ROLE === "admin");
    } else {
      setIsLogin(false);
      setUserName("");
      setIsAdmin(false);
    }
  }, [User]);

  // Fetch vocab
  useEffect(() => {
    const fetchVolcap = async () => {
      const response = await axios.get(VOLCAP_URL);
      const filteredData = response.data.filter(
        (item) =>
          item.type?.toString().trim().toLowerCase() ===
          currentItem.toString().trim().toLowerCase()
      );
      setCurrentVolcap(filteredData);
    };
    fetchVolcap();
  }, [currentItem]);
  const getVCH = () => {
    if (!vch || !volcab) return [];
    return vch.VCH.map((m) => volcab.find((k) => k.id === m)).filter(Boolean);
  };

  return (
    <div>
      <button onClick={() => { console.log(User); }}> test</button>
      <div className="m-4 flex flex-column align-items-center">
        {isLogin && <h2>Xin chào, {userName}</h2>}

        {/* Search + filter */}
        <div className="flex align-items-center flex-column w-full">
          <div className="d-flex align-items-center border-blue-400 border border-round-3xl px-3 py-2 shadow-sm m-auto w-7 bg-white h-full">
            <i className="pi pi-search"></i>
            <input
              type="text"
              className="form-control border-0 shadow-none bg-transparent"
              placeholder="Nhập tiếng Trung"
            />
            <i className="pi pi-microphone"></i>
            <i className="pi pi-pencil"></i>
          </div>

          <div className="flex justify-content-center align-items-center mt-3">
            {itemsList.map((m) => (
              <a
                key={m.cont}
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

      {/* Layout */}
      <Layout style={{ backgroundColor: "#f0f2f5" }}>
        <div className="responsive-layout">
          {/* Left column */}
          <div className="column left-col">
            <Card className="border-round-2xl" title="Từ khóa hot" size="small">
              {currentVolcap.map((m) => (
                <Tag
                  key={m.id}
                  color="blue"
                  style={{ marginBottom: 8, cursor: "pointer" }}
                  onClick={() => {
                    setVocapHistory((prev) => {
                      if (prev.includes(m.id)) return prev;
                      return [...prev, m.id];
                    });
                  }}
                >
                  {m.content}
                </Tag>
              ))}
            </Card>

            <Card className="border-round-2xl" title="Lịch sử" size="small">
              {!validHis ? (
                <div className="flex flex-column text-center">
                  <Image
                    className="p-0"
                    src="/status.png"
                    alt="Image"
                    width="100px"
                    height="100px"
                  />
                  <p className="mb-0">Không có dữ liệu</p>
                </div>
              ) : (
                <div>
                  {getVCH().map((item) => (
                    <Tag key={item.id} color="purple" style={{ margin: 4 }}>
                      {item.content}
                    </Tag>
                  ))}
                </div>
              )}
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

          {/* Middle column */}
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
              title={`💡 Mẹo ${tips.length > 0 ? `(${tips.length})` : ""}`}
              size="small"
              style={{ flex: 1 }}
              onClick={() => setTipsVisible(!tipsVisible)}
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

          {/* Right column */}
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
                  <Button size="small" text>
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
              {/* Comments */}
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
                    currentUser={UID}
                  />
                ))}
              </div>

              {/* Comment input */}
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
          }
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
          }
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
        `}</style>
      </Layout>

      {/* Tips Modal */}
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
            {/* Danh sách mẹo có scroll */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxHeight: 200, // chiều cao tối đa
                overflowY: "auto", // bật scroll dọc
                paddingRight: 4,
              }}
            >
              {tips.map((tip) => (
                <div
                  key={tip.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 10px",
                    background: "#f6f9ff",
                    borderRadius: "8px",
                    border: "1px solid #e6ecf5",
                  }}
                >
                  <span style={{ marginRight: 8 }}>💡</span>
                  <span>{tip.content}</span>
                </div>
              ))}
            </div>

            {/* Ô nhập cho admin */}
            {isAdmin && (
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Input
                  placeholder="Thêm mẹo mới..."
                  value={tipsContent}
                  onChange={(e) => setTipsContent(e.target.value)}
                  onPressEnter={handleAddTip}
                />
                <Button type="primary" onClick={handleAddTip}>
                  Thêm
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
 