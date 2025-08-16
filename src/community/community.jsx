import React from "react";
import { PostCard } from "../components/Card";
import { Card, Layout } from "antd";

export const Communicate = () => {
  return (
    <div className="my-3">
      <Layout style={{ backgroundColor: "#f0f2f5" }}>
        <div className="responsive-layout">
          {/* Cột trái */}
          <div className="column left-col">
            <Card title="Cau hoi duoc quan tam">

            </Card>
            <Card title="The loai"></Card>
          </div>

          {/* Cột giữa */}
          <div className="column middle-col">


          </div>

          {/* Cột phải */}
          <div className="column right-col">

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
          }
        `}</style>{" "}
      </Layout>
    </div>
  );
};
