import { Routes, Route } from "react-router-dom";
import Homepage from "./homepage/homepage";
import "/node_modules/primeflex/primeflex.css";
import { Transerlate } from "./transerlate/transerlate";
import { Test } from "./testpage/test";

export const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/translate" element={<Transerlate />} />
      <Route path="/test" element={<Test />} />
      <Route path="/handbook" element={<div>Handbook</div>} />
      <Route path="/upgrade" element={<div>Upgrade</div>} />
    </Routes>
  );
};
