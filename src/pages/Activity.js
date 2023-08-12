import styles from "./Activity.module.css";
import Card from "../UI/Card";
import Kakaomap from "../UI/KakaoMap";
import snowboard from "../Images/snowboard.jpeg";
const Activity = () => {
  const upcomingList = [
    {
      sort: "discussion",
      place: "강남",
      date: new Date("2023-08-27"),
      book: "미정",
      topic: "경제",
    },
    {
      sort: "discussion",
      place: "신논현",
      date: new Date("2023-09-10"),
      book: "미정",
      topic: "문학",
    },
  ];
  const activityList = [
    {
      sort: "activity",
      place: "강원도 비발디파크",
      date: "미정",
      name: "스키여행",
      image: snowboard
    },
  ];
  const arrDayStr = ["일", "월", "화", "수", "목", "금", "토"];
  const dateStr = (event) => {
    return (
      event.date.getFullYear() +
      "년 " +
      (event.date.getMonth() + 1) +
      "월 " +
      event.date.getDate() +
      "일 (" +
      arrDayStr[event.date.getDay()] +
      ")"
    );
  };

  return (
    <div className={styles.activityPage}>
      <Card className="upcoming">
        <p style={{ fontWeight: 700, fontSize: "2rem" }}>Upcoming</p>
        {upcomingList.map((event) => {
          return (
            <Card className="information">
              <Kakaomap place={event.place} />
              {/* <div style={{width:'100%',height:'15rem',backgroundColor:"red"}}></div> */}
              <div className={styles.details}>
                <p>{event.date === "미정" ? "날짜 미정" : dateStr(event)}</p>
                <p>&lt;{event.book}&gt;</p>
                <p>{event.topic}</p>
              </div>
            </Card>
          );
        })}
        {activityList.map((event) => {
          return (
            <Card className="information">
              <div style={{width:'100%',height:'15rem'}}>
                <img style={{width:'inherit',height:'inherit',objectFit:'fill'}} src={event.image}/>
              </div>
              <div className={styles.details}>
                <p>{event.date === "미정" ? "날짜 미정" : dateStr(event)}</p>
                <p>{event.place}</p>
                <p>{event.name}</p>
              </div>
            </Card>
          );
        })}
        <p style={{ fontWeight: 700, fontSize: "2rem",marginTop:'1rem' }}>Form Page</p>
        <Card className="container_form"> </Card>
      </Card>
    </div>
  );
};

export default Activity;
