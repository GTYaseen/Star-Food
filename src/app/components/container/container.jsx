import React from "react";

function Container({ children, width, ...props }) {
  if (!width){
    const widthh = 1000;
  }else{
    const widthh = width
  }
  return (
    <div className={`w-full max-w-[${widthh}px] mx-auto my-auto`} {...props}>
      {children}
    </div>
  );
}
export default Container;

