import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input, Button } from "antd";
import { CmtCard } from "../components/Card";

export const ChineseEnglish = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [field, setField] = useState([]);
  const stored = localStorage.getItem("myData");
  const parsed = stored ? JSON.parse(stored) : null;
  const volcapId = parsed.id
  const category = parsed.category

  const [volcabularyTitle, setVolcabularyTitle] = useState([]);
  const [volcabularyData, setVolcabularyData] = useState([]);
  const getVolcabularyByIDURL = "http://localhost:8080/api/volcap/getbyid/";
  const getCMT_URL = "http://localhost:8080/api/comments";
  const createCMT_URL = "http://localhost:8080/api/comments/create";

  const Userid = JSON.parse(localStorage.getItem("user"));
  const UID = Userid?.userid;
  const fetchVolcabulary = async () => {
    const response = await axios.get(getVolcabularyByIDURL + volcapId);
    const filterdata= response.data.data.filter((m)=>m.category_name===category)
    const uniqueFields = [
      ...new Map(
        filterdata.map((m) => [
          m.data_field,
          {
            field: m.data_field,
            href: "#" + m.data_field.trim().toLowerCase().replace(/\s+/g, "-"),
          },
        ])
      ).values(),
    ];
    setField(uniqueFields);
    setVolcabularyTitle(response.data.data[0]);

    setVolcabularyData(filterdata);
  };
  useEffect(() => {
    fetchVolcabulary();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get(getCMT_URL);
    const filteredData = response.data.data[0].filter(
      (m) => m.category_id === 1
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
        categoryId: volcabularyTitle.category_id,
      });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <div className="flex gap-3 my-4 justify-content-center">
      <button onClick={()=>{console.log(volcapId);
      }}>test</button>
      {/* Cột trái */}
      <div style={{ flex: "1" }}>
        <Card styles={{ body: { padding: 0 } }}>
          <ul className="m-0 py-3 px-0">
            <li className="list-none px-3 py-1">
              <a key="tu_vung" href="#từ-vựng" className="text-black-alpha-90 no-underline">
                Từ vựng
              </a>
            </li>
            {field.map((m) => (
              <li className="list-none px-3 py-1">
                <a key={m.field} href={m.href} className="text-black-alpha-90 no-underline">
                  {m.field}
                </a>
              </li>
            ))}
            <li className="list-none px-3 py-1">
              <a
                href="#độ-phổ-biến"
                className="text-black-alpha-90 no-underline"
              >
                Độ phổ biến
              </a>
            </li>
            <li className="list-none px-3 py-1">
              <a href="#image" className="text-black-alpha-90 no-underline">
                Hình ảnh
              </a>
            </li>
          </ul>
        </Card>
      </div>

      {/* Cột giữa */}
      <div
        className="gap-1"
        style={{ flex: "2", display: "flex", flexDirection: "column" }}
      >
        <Card id="từ-vựng">
          <div>
            <p className="m-0 p-0 " style={{ color: "red", fontSize: 20 }}>
              {volcabularyTitle?.name || ""}
            </p>
            <p className="m-0 p-0 " style={{ color: "gray", fontWeight: 1 }}>
              {volcabularyTitle?.word_spell || ""}
            </p>
          </div>
        </Card>
        {field.map((m) => (
          <Card
            key={m.id}
            id={m.field.trim().toLowerCase().replace(/\s+/g, "-")}
            title={m.field}
          >
            {volcabularyData
              .filter((f) => f.data_field === m.field)
              .map((v, index) => (
                <div key={v.transerlate}>
                  {index + 1}. {v.transerlate}
                  <div
                    style={{
                      paddingLeft: 5,
                      marginLeft: 3,
                      borderColor: "gray",
                    }}
                    className="border-left-2"
                  >
                    <div>{v.transerlate_example || ""}</div>
                    <div>
                      {v?.transerlate_content?.map((m, index) => (
                        <div key={index}>
                          <div>{m.example || ""}</div>
                          <div>{m.pronunciation || ""}</div>
                          <div>{m.translate || m.transerlate || ""}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </Card>
        ))}

        <Card id="image">
          <img src={volcabularyTitle?.image||"/public/appearance.png"} alt={"ảnh ví dụ từ" +volcabularyTitle.name}/>
        </Card>
        <Card id="độ-phổ-biến">
          <div className="flex justify-content-between">
            <div>Độ phổ biến: </div>
            <div>Lượt tìm kiếm: {volcabularyData[0]?.popular?.length}</div>
          </div>
        </Card>
        <Card title="Gop y">
          <div style={{ flex: 1, overflowY: "auto", height: 80 }}>
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
