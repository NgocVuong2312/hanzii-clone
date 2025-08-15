import React, { useState } from "react";
import { Card, Layout, Button } from "antd";
import { testList } from "../MenuItem";
import { Sidebar } from "./sider";
const { Sider, Content } = Layout;

export const Test = () => {
  const initialSelectedLevels = {};
  testList.forEach((group) => {
    initialSelectedLevels[group.group] = group.levels[0].label;
  });

  const [selectedLevels, setSelectedLevels] = useState(initialSelectedLevels);

  const handleLevelChange = (groupName, levelLabel) => {
    setSelectedLevels((prev) => ({
      ...prev,
      [groupName]: levelLabel,
    }));
  };

  return (
    <div className="my-4">
      <Layout className="gap-2 " style={{ backgroundColor: "#f0f1f5 " }}>
        <Layout style={{ backgroundColor: "#f0f1f5 " }}>
          <Content>
            <div className="flex flex-column gap-2">
              {testList.map((group) => {
                const selectedLevelLabel = selectedLevels[group.group];
                const selectedLevel = group.levels.find(
                  (level) => level.label === selectedLevelLabel
                );

                return (
                  <Card title={group.group} key={group.group}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: "10px",
                      }}
                    >
                      {group.levels.map((level) => (
                        <Button
                          key={level.label}
                          type={
                            selectedLevelLabel === level.label
                              ? "primary"
                              : "default"
                          }
                          onClick={() =>
                            handleLevelChange(group.group, level.label)
                          }
                        >
                          {level.label}
                        </Button>
                      ))}
                    </div>

                    <div
                      className="flex flex-wrap gap-2"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      {selectedLevel.test.map((item, index) => (
                        <Card
                          key={index}
                          title={item.lab}
                          style={{ width: 200 }}
                        >
                          <p>{item.cont}</p>
                          <Button type="primary" block>
                            Bắt đầu
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </Content>
        </Layout>
        <Sider width="25%" style={{ backgroundColor: "#f0f1f5 " }}>
          <Sidebar />
        </Sider>
      </Layout>
    </div>
  );
};
