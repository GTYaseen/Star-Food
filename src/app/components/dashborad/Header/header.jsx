import Link from "next/link";
import AppContainer from "../Contaner/container";
import styles from "./header.module.css";
import { RiRestartLine } from "react-icons/ri";

const Header = () => {
  return (
    <div className={styles.header}>
      <AppContainer width={1300}>
        <div className={styles.content}>
          <h2 className={styles.logo}><RiRestartLine /></h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/invoice">invoice</Link>
            </li>
          </ul>
        </div>
      </AppContainer>
    </div>
  );
};

export default Header;
