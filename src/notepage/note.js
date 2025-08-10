import { useLocation } from "react-router-dom";
import React from "react";
export const MyComponent = () => {
  const location = useLocation();

  console.log(location);

  return (
    <div>
      <p>Current path: {location.pathname}</p>
    </div>
  );
};
