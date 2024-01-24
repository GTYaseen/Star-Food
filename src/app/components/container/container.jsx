import React from "react";

function AppContainer({ children }) {
  return <div className={`lg:max-w-screen-lg mx-auto sm:max-w-full sm:px-4 `}>{children}</div>;
}
export default AppContainer;
