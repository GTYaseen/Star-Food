import styles from "./container.module.css";

const AppContainer = ({ children, width = 1000 }) => {
  return (
    <div className={styles.appContainer} style={{ maxWidth: width }}>
      {children}
    </div>
  );
};

export default AppContainer;
