import React from "react";
import { Card, Layout, Button, Row, Col } from "antd";
import { Image } from "primereact/image";
const { Sider, Content } = Layout;
const categories = [
  { title: "HSK 1", words: 504, type: "free" },
  { title: "HSK 2", words: 764, type: "free" },
  { title: "HSK 3", words: 996, type: "free" },
  { title: "HSK 4", words: 995, type: "free" },
  { title: "HSK 5", words: 1448, type: "free" },
  { title: "HSK 6", words: 1217, type: "free" },
  { title: "HSK 7-9", words: 5621, type: "free" },
  { title: "TOCFL 1", words: 513, type: "free" },
  { title: "TOCFL 2", words: 485, type: "free" },
  { title: "TOCFL 3", words: 1307, type: "free" },
  { title: "TOCFL 4", words: 2208, type: "free" },
  { title: "TOCFL 5-6", words: 2796, type: "free" },
  { title: "Động từ li hợp", words: 322, type: "premium" },
  { title: "Lượng từ", words: 242, type: "premium" },
  { title: "Truyền thông", words: 228, type: "premium" },
  { title: "Mua bán online", words: 151, type: "premium" },
  { title: "Các thể loại phim", words: 82, type: "premium" },
  { title: "Bài thuốc đông y", words: 70, type: "premium" },
  { title: "Tết nguyên đán", words: 173, type: "premium" },
  { title: "Quảng cáo marketing", words: 254, type: "premium" },
  { title: "Tiễn tệ trong tiếng trung", words: 142, type: "premium" },
  { title: "Quần áo", words: 258, type: "premium" },
  { title: "Mỹ phẩm", words: 71, type: "premium" },
  { title: "Spa", words: 127, type: "premium" },
];

export default function Note() {
  const freeCategories = categories.filter((c) => c.type === "free");
  const premiumCategories = categories.filter((c) => c.type === "premium");

  return (
    <div>
      <Layout className="my-3 gap-2" style={{ backgroundColor: "transparent" }}>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button className="border-round-xl px-3 py-2 h-auto">Tạo sổ tay</Button>
            <Button className="border-round-xl px-3 py-2 h-auto">
              <i className="pi pi-sort-down"></i>
            </Button>
          </div>
          <Card
            className="border-round-2xl"
            title="Ca nhan"
            bodyStyle={{ padding: "0" }}
          >
            <div className="flex flex-column text-center p-0">
              <Image
                className="p-0"
                src="/status.png"
                alt="Image"
                width="100px"
                height="100px"
              />
              <b>Bạn chưa tạo sổ tay</b>
              <p className="mb-3">
                Bạn có thể thêm từ vựng, hán tự, ngữ pháp, mẫu câu vào sổ tay
              </p>
            </div>
          </Card>
          <Card
            title="Mien phi"
            className="border-round-2xl"
            bodyStyle={{ paddingBottom: "0" }}
          >
            {/* Miễn phí */}
            <div style={{ marginBottom: 20 }}>
              <Row gutter={[16, 16]}>
                {freeCategories.map((cat) => (
                  <Col xs={12} sm={8} md={6} lg={4} key={cat.title}>
                    <Card hoverable>
                      {cat.title} <br /> {cat.words} từ
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
          <Card title="Cao cap" className="border-round-2xl">
            {/* Cao cấp */}
            <div>
              <Row gutter={[16, 16]}>
                {premiumCategories.map((cat) => (
                  <Col xs={12} sm={8} md={6} lg={4} key={cat.title}>
                    <Card
                      hoverable
                      style={{ height: "100%" }} // cho Card chiếm toàn bộ chiều cao Col
                      bodyStyle={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {cat.title} <br /> {cat.words} từ
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Content>
        <Sider
          className="h-auto"
          width="25%"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div className="flex flex-column gap-3 h-full">
              <div className="flex align-items-center border border-round-xl px-3 py-2  bg-white h-auto">
                <i className="pi pi-search"></i>
                <input
                  type="text"
                  className="form-control border-0 shadow-none bg-transparent"
                  placeholder="Tìm kiếm "
                />
              </div>
            </div>
          <Card className="border-round-2xl h-auto">
          </Card>
        </Sider>
      </Layout>
    </div>
  );
}
