import styles from "./Activity.module.css";
import Card from "../UI/Card";
import Kakaomap from "../UI/KakaoMap";
const Activity = () => {
  const upcoming = {
    place: "강남",
    date: new Date("2023-08-27"),
    book: "미정",
    topic: "경제",
  };
  const arrDayStr = ["일", "월", "화", "수", "목", "금", "토"];
  const dateStr =
    upcoming.date.getFullYear() +
    "년 " +
    (upcoming.date.getMonth() + 1) +
    "월 " +
    upcoming.date.getDate() +
    "일 (" +
    arrDayStr[upcoming.date.getDay()] +
    ")";

  return (
    <div className={styles.activityPage}>
      <Card className="upcoming">
        <p style={{ fontWeight: 700, fontSize: "2rem" }}>Upcoming</p>
        <Card className="information">
          <Kakaomap place={upcoming.place} />
          <div className={styles.details}>
            <p>{dateStr}</p>
            <p>&lt;{upcoming.book}&gt;</p>
            <p>{upcoming.topic}</p>
          </div>
        </Card>
        <Card className="container_form"> form page</Card>
      </Card>
    </div>
  );
};

export default Activity;
