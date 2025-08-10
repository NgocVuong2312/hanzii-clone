import React, { useState } from "react";
import { Button, Col, Row, Card, Input } from "antd";
import { Dropdown } from "primereact/dropdown";
import { SwapOutlined } from "@ant-design/icons";
import { Image } from "primereact/image";
import { translateText } from "./ggtransapi";
const { TextArea } = Input;

export const Transerlate = () => {
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    const translated = await translateText(
      inputText,
      lefttrans.key,
      righttrans.key
    );
    setOutputText(translated);
  };

  const language = [
    { key: "vi", label: "Vietnamese" },
    { key: "ru", label: "Nga" },
    { key: "zh", label: "Trung" },
  ];

  const [lefttrans, setlefttrans] = useState(language[2]);
  const [righttrans, setrighttrans] = useState(language[0]);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const leftdata = (data) => {
    return data.filter((item) => item.key !== righttrans.key);
  };

  const rightdata = (data) => {
    return data.filter((item) => item.key !== lefttrans.key);
  };

  return (
    <div className="mt-3">
      <div className="flex justify-content-between">
        <div className="cursor-pointer flex flex-row align-items-center gap-2">
          <Button>Văn bản</Button>
          <Button>Tài liệu</Button>
        </div>
        <Button>Cài đặt</Button>
      </div>

      <Row gutter={[8, 8]} className="mb-2" style={{ position: "relative" }}>
        <Col span={12}>
          <Card
            extra={
              <div className="flex flex-row align-items-center gap-3">
                <Dropdown
                  value={lefttrans}
                  onChange={(e) => setlefttrans(e.value)}
                  options={leftdata(language)}
                  optionLabel="label"
                  placeholder="Chọn ngôn ngữ"
                />
              </div>
            }
            title={<Button>{lefttrans?.label}</Button>}
            size="small"
            style={{ flex: 1 }}
            className="mt-3"
          >
            <TextArea rows={4} maxLength={600} className="input" />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            extra={
              <Dropdown
                value={righttrans}
                onChange={(e) => setrighttrans(e.value)}
                options={rightdata(language)}
                optionLabel="label"
                placeholder="Chọn ngôn ngữ"
              />
            }
            title={
              <div className="flex flex-row align-items-center gap-2">
                <Button>{righttrans?.label}</Button>
              </div>
            }
            size="small"
            style={{ flex: 1 }}
            className="mt-3"
          >
            <TextArea
              rows={4}
              maxLength={600}
              value={outputText}
              className="output"
              readOnly
            />
          </Card>
        </Col>

        <Button
          shape="circle"
          type="primary"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={() => {
            const temp = lefttrans;
            setlefttrans(righttrans);
            setrighttrans(temp);
          }}
        >
          <SwapOutlined />
        </Button>
      </Row>
      <Button
        type="primary"
        onClick={() => {
          setInputText(document.querySelector(".input").value);
          handleTranslate();
          console.log(inputText, lefttrans.key, righttrans.key);
        }}
      >
        Dịch
      </Button>
      <Card title="Lịch sử" size="small" style={{ flex: 1 }}>
        <p className="mb-0">Lịch sử</p>
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
      </Card>
    </div>
  );
};
