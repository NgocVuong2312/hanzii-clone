import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { caro, itemsList, volcapList } from "../MenuItem";
import { Layout, Card, Tag, Dropdown } from "antd";

import { Carousel } from "primereact/carousel";

import { LeftOutlined, RightOutlined, ReadOutlined } from "@ant-design/icons";
import { ItemCard, CmtCard } from "../components/Card";

export default function Homepage() {
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
  const [date, setdate] = useState("Ngày");
  // eslint-disable-next-line
  const [userName, setUserName] = useState("Vuong");
  // eslint-disable-next-line
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState("Han tu");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % caro.length);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [caro.length]);

  return (
    <div>
      <div className="m-4 flex flex-column align-items-center">
        <h2>xin chào, {userName}</h2>
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
              <Button
                key={""}
                label={m.label}
                onClick={() => {
                  setCurrentItem(m.cont);
                }}
                text
              />
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
                  // eslint-disable-next-line
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
              title="💡 Mẹo (1/607)"
              size="small"
              style={{ flex: 1 }}
            >
              <p>
                Complete offline usage of icons, without dependency on a
                CDN-hosted font icon file...
              </p>
              <div style={{ textAlign: "right" }}>
                <Button type="primary" size="small" text>
                  Sơ cấp
                </Button>
              </div>
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
              style={{ flex: 1 }}
              bodyStyle={{ maxHeight: 400, overflowY: "auto" }}
            >
              <CmtCard
                className="border-round-2xl"
                cont="hay"
                userName="Vuong"
              />
              <CmtCard
                className="border-round-2xl"
                cont="hay"
                userName="Vuong"
              />
              <CmtCard
                className="border-round-2xl"
                cont="hay"
                userName="Vuong"
              />
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
        <style >{`
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
    </div>
  );
}
