import React, { useState } from "react";
import { Row, Col, Avatar, Card, Dropdown, Button } from "antd";
import {
  DownOutlined,
  CrownOutlined,
  UserOutlined,
} from "@ant-design/icons";

const leaderboardData = {
  HSK1: [
    { username: "vuong1", score: 200 },
    { username: "vuong2", score: 200 },
    { username: "vuong3", score: 200 },
    { username: "vuong4", score: 200 },
    { username: "vuong5", score: 200 },
  ],
  TOCFL: [
    { username: "vuong5", score: 200 },
    { username: "vuong2", score: 200 },
    { username: "vuong3", score: 200 },
    { username: "vuong4", score: 200 },
    { username: "vuong1", score: 200 },
  ],
  D4: [
    { username: "vuong1", score: 200 },
    { username: "vuong2", score: 200 },
    { username: "vuong3", score: 200 },
    { username: "vuong4", score: 200 },
    { username: "vuong5", score: 200 },
  ],
};

const ranking = [
  { label: "HSK", key: "HSK1" },
  { label: "TOCFL", key: "TOCFL" },
  { label: "D4", key: "D4" },
];

export default function Leaderboard() {
  const [currentLevel, setCurrentLevel] = useState("HSK1");

  const renderTop3 = (data) => {
    const [top1, top2, top3] = data;
    return (
      <Row gutter={16} justify="center" className="mb-4">
        <Col>
          <Card size="small" style={{ background: "#e0e5f9", textAlign: "center", width: 100 }}>
            <div style={{ fontWeight: "bold" }}>2</div>
            <Avatar size={40} icon={<UserOutlined />} />
            <div style={{ fontSize: 12 }}>{top2.username}</div>
          </Card>
        </Col>
        <Col>
          <Card size="small" style={{ background: "#fff7d6", textAlign: "center", width: 100 }}>
            <CrownOutlined style={{ color: "#fadb14", fontSize: 20 }} />
            <div style={{ fontWeight: "bold" }}>1</div>
            <Avatar size={40} icon={<UserOutlined />} />
            <div style={{ fontSize: 12 }}>{top1.username}</div>
          </Card>
        </Col>
        <Col>
          <Card size="small" style={{ background: "#fde3cf", textAlign: "center", width: 100 }}>
            <div style={{ fontWeight: "bold" }}>3</div>
            <Avatar size={40} icon={<UserOutlined />} />
            <div style={{ fontSize: 12 }}>{top3.username}</div>
          </Card>
        </Col>
      </Row>
    );
  };
  
  const renderList = (data) => {
    const [, , , ...rest] = data;
    return rest.map((user, index) => (
      <Row key={user} style={{ padding: "6px 12px", borderBottom: "1px solid #f0f0f0" }}>
        <Col span={2}>{index + 4}.</Col>
        <Col span={16}>{user.username}</Col>
        <Col span={6} style={{ textAlign: "right" }}>{user.score}/200</Col>
      </Row>
    ));
  };
  

  const currentData = leaderboardData[currentLevel];

  return (
    <div>
      <Card
        title="Bảng xếp hạng"
        className="w-full"
        extra={
          <Dropdown
            menu={{
              items: ranking,
              onClick: ({ key }) => setCurrentLevel(key),
            }}
          >
            <Button size="small" type="text">
              {currentLevel} <DownOutlined />
            </Button>
          </Dropdown>
        }
      >
            {renderTop3(currentData)}
            {renderList(currentData)}
       
      </Card>
    </div>
  );
}
