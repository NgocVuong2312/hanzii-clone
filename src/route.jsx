import { Routes, Route } from "react-router-dom";
import Homepage from "./homepage/homepage";
import "/node_modules/primeflex/primeflex.css";
import { Transerlate } from "./transerlate/transerlate";
import Note from "./notepage/note"
import { Test } from "./testpage/test";
import { Communicate  } from "./community/community";
export const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/translate" element={<Transerlate />} />
      <Route path="/test" element={<Test />} />
      <Route path="/handbook" element={<Note/>} />
      <Route path="/community" element={<Communicate/>} />
    </Routes>
  );
};
