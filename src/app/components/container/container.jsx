import React from "react";

function AppContainer({ children, width=1000, ...props }) {
  return (
    <div className={`w-full max-w-[1000px] mx-auto my-auto`} {...props}>
      {children}
    </div>
  );
}
export default AppContainer;

