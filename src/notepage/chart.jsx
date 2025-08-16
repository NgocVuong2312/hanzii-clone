import React from "react";
import { Card } from "antd";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Đã thuộc", value: 0, color: "#00b894" },
  { name: "Chưa thuộc", value: 0, color: "#d63031" },
  { name: "Không chắc", value: 0, color: "#fdcb6e" },
  { name: "Yêu thích", value: 0, color: "#2d3436" },
];

export const  Charttemplate=()=> {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="flex justify-content-center">
      <PieChart width={180} height={180}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <text
          x={90}
          y={90}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "24px", fontWeight: "bold" }}
        >
          {total} từ
        </text>
      </PieChart>
      <div style={{ marginTop: 10 }}>
        {data.map((item) => (
          <div key={item.name} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.color,
                marginRight: 8,
              }}
            ></div>
            <span>{item.value} {item.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
