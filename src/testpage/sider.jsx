import React,{useState} from "react";
import { Card, Button } from "antd";
import { testTips } from "../MenuItem";
import LeaderboardCard from "./leader";

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(testTips[0]); 
  return (
    <div className="flex flex-column gap-3 h-full">
      <div className="d-flex align-items-center border border-round-xl px-3 py-2  bg-white h-auto">
        <i className="pi pi-search"></i>
        <input
          type="text"
          className="form-control border-0 shadow-none bg-transparent"
          placeholder="Tìm kiếm "
        />
      </div>
      <Card className="h-full" title="Meo">
        <div className="flex flex-row gap-1">
          {testTips.map((item) => (
            <Button key={item.label} type="primary" onClick={()=>(
              setActiveTab(item)
            )}>{item.label}</Button>
          ))}
        </div>
        <div className="mt-3">
          {activeTab.cont.map((tip) => (
            <div key={tip} className="py-2  border-bottom-1">{tip.child}</div>
          ))}
        </div>
      </Card>
      <LeaderboardCard />
    </div>
  );
};
