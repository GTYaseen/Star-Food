import React from "react";
import "./container.module.css";

function Container({ children, width, ...props }) {
  return (
    <div className="container" style={{ maxWidth: width }}>
      {children}
    </div>
  );
}

export default Container;
