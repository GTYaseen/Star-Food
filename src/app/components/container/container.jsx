import React from "react";

function AppContainer({ children, width, ...props }) {
  return (
    <div className={`w-full max-w-[${width}px] mx-auto my-auto`} {...props}>
      {children}
    </div>
  );
}
export default AppContainer;

