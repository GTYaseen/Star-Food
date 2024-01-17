import React from "react";
import styles from "./container.module.css";

function AppContainer({ children, width=1000, ...props }) {
  return (
    <div className={styles.container} style={{width: width}}>
      {children}
    </div>
  );
}
export default AppContainer;

