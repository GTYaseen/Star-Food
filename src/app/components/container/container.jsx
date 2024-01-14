import React from "react";

function Container({ children, width, ...props }) {
  return (
    <div className="w-full max-w-[1000px] mx-auto my-auto" style={{ maxWidth: width }}>
      {children}
    </div>
  );
}

export default Container;
