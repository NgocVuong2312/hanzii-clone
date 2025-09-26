import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { itemsList } from "../MenuItem";
import { Volcabulary } from "./Volcabulary";
import { ChineseChinese } from "./ChineseChinese";
import { ChineseEnglish } from "./ChineseEnglish";
export const VolcabularyPage = () => {
  const stored = localStorage.getItem("myData");
  const parsed = stored ? JSON.parse(stored) : null;
  const vocabularyID= parsed.id;
  const [category, setCategory] = useState(parsed.category);
  useEffect(() => {
    if (category === "tu_vung") {
      setIsVolcabulary(true);
      setIsChineseChinese(false)
      setIsChineseEnglish(false)
      localStorage.setItem(
                      "myData",
                      JSON.stringify({
                        id: vocabularyID,
                        category: "tu_vung",
                      })
                    );
    }
    else if (category === "trung_trung") {
      setIsChineseChinese(true);
      setIsVolcabulary(false);
      setIsChineseEnglish(false)
      localStorage.setItem(
                      "myData",
                      JSON.stringify({
                        id: vocabularyID,
                        category: "trung_trung",
                      })
                    );
                    
    }
    else if (category === "trung_anh") {
      setIsChineseEnglish(true);
      setIsVolcabulary(false)
      setIsChineseChinese(false)
      localStorage.setItem(
                      "myData",
                      JSON.stringify({
                        id: vocabularyID,
                        category: "trung_anh",
                      })
                    );
                    
    }
  }, [category]);
  const [isVolcabulary, setIsVolcabulary] = useState(false);
  const [isChineseChinese, setIsChineseChinese] = useState(false);
  const [isChineseEnglish,setIsChineseEnglish]=useState(false)
  return (
    <div className="flex gap-3 my-4 justify-content-center flex-column">
      <div className="flex align-items-center flex-column w-full">
        <div className="d-flex align-items-center border-blue-400 border border-round-3xl px-3 py-2 shadow-sm m-auto w-7 bg-white h-full">
          <i className="pi pi-search"></i>
          <input
            type="text"
            className="form-control border-0 shadow-none bg-transparent"
            placeholder="Nhập tiếng Trung"
          />
          <i className="pi pi-microphone"></i>
          <i className="pi pi-pencil"></i>
        </div>

        <div className="flex justify-content-center align-items-center gap-2 mt-3">
          {itemsList.map((m) => (
            <button
              key={m.cont}
              style={
                category === m.cont
                  ? { backgroundColor: "#47609f", color: "white" }
                  : {}
              }
              className="flex align-items-center py-1 px-3 border-0 border-round-3xl cursor-pointer"
              onClick={() => setCategory(m.cont)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      {isVolcabulary && <Volcabulary />}
      {isChineseChinese && <ChineseChinese />}
      {isChineseEnglish&&<ChineseEnglish/>}
    </div>
  );
};