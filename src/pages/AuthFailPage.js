import styles from "./AuthFailPage.module.css";
import Card from "../UI/Card";
import oops from "../Images/Oops.jpg";
const AuthFailPage = () => {
  return (
    <div className={styles.background}>
      <Card className="AUTHFAIL_announcement">
        <div className={styles.imgcontainer}>
          <img
            className={`${styles.imgcontainer} ${styles.img}`}
            src={oops}
            alt="sorry"
          />
        </div>
        <p>회원들에게만 공개된 정보입니다.</p>
      </Card>
    </div>
  );
};

export default AuthFailPage;
