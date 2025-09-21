import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "primeicons/primeicons.css";
import { Card, Input, Button } from "antd";
import { CmtCard } from "../components/Card";

export const VolcabularyPage = () => {
  const location = useLocation();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [volcabularyData,setVolcabularyData]= useState([]);
  const getVolcabularyByIDURL = "http://localhost:8080/api/volcap/getbyid/"
  const getCMT_URL = "http://localhost:8080/api/comments";
  const createCMT_URL = "http://localhost:8080/api/comments/create";

  const Userid = JSON.parse(localStorage.getItem("user"));
  const UID = Userid?.userid;

  const fetchVolcabulary = async()=>{
    const response =await axios.get(getVolcabularyByIDURL+volcapId)
    setVolcabularyData(response.data.data[0]);
  }
  useEffect(()=>{
    fetchVolcabulary()
  },[])

  const fetchComments = async () => {
    const response = await axios.get(getCMT_URL);
    const filteredData = response.data.data[0].filter(
      (m) => m.volcapId === volcapId
    );
    setComments(filteredData);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    try {
      await axios.post(createCMT_URL, {
        CONTENT: comment,
        UID: UID,
        volcapId: volcapId,
      });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const [volcapId, setVolcapId] = useState(location.state?.data?.content || "");

  const [activeParagaph, setActiveParagaph] = useState();
  
  return (
    <div className="flex gap-3 my-4 justify-content-center">
        <button  onClick={()=>{console.log(volcabularyData);
        }}>test</button>
      {/* Cột trái */}
      <div style={{ flex: "1" }}>
        <Card bodyStyle={{ padding: 0 }}>
          <ul className="m-0 py-3 px-0">
          </ul>
        </Card>
      </div>

      {/* Cột giữa */}
      <div
        className="gap-1"
        style={{ flex: "2", display: "flex", flexDirection: "column" }}
      >
        <Card ><div>
                <p className="m-0 p-0 " style={{color:"red", fontSize:20}}>{volcabularyData.name}</p>
                <p className="m-0 p-0 " style={{color:"gray", fontWeight:1}}>{volcabularyData.word_spell}</p>
            </div></Card>
        <Card title="Gop y">
          <div style={{ flex: 1, overflowY: "auto", height:80 }}>
            {comments.map((cmt) => (
              <CmtCard key={cmt.ID} id={cmt.ID} currentUser={UID} />
            ))}
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Input
              placeholder="Them nghia va vi du"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onPressEnter={handleAddComment}
            />
            <Button type="primary" onClick={handleAddComment}>
              <i className="pi pi-send"></i>
            </Button>
          </div>
        </Card>
      </div>

      {/* Cột phải */}
      <div className="bg-white" style={{ flex: "1" }}>
        cot phai
      </div>
    </div>
  );
};
