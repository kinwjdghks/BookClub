import styles from "./TopHeader.module.css";
import Book from "../Images/booklogo.svg";
import { Link } from "react-router-dom";
const TopHeader = () => {
  return (
    <div className={styles.Topheader}>
      <Link to={"./"}>
        <div className={styles.imgcontainer_logo}>
          <img className={styles.img_logo} src={Book} alt="logo" />
        </div>
      </Link>
    </div>
  );
};

export default TopHeader;
