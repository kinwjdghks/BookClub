import styles from "./Activity.module.css";
import Card from "../UI/Card";
import Kakaomap from "../UI/KakaoMap";
import snowboard from "../Images/snowboard.jpeg";
import Modal from "../UI/Modal";
import { useState, useRef, useEffect } from "react";

const dummyList = [
  {
    meetingType: "discussion",
    place: "강남",
    date: new Date("2023-08-27"),
    theme: "경제",
    image: "",
    point:[37.49798640766797,127.02764966969421],
    key: "1",
  },
  // {
  //   meetingType: "discussion",
  //   place: "신논현",
  //   date: new Date("2023-09-10"),
  //   theme: "문학",
  //   image: "",
  //   point:[37.50450137396596,127.02450799203919],
  //   key: "2",
  // },
  {
    meetingType: "activity",
    place: "강원도 비발디파크",
    date: "미정",
    theme: "스키여행",
    image: snowboard,
    point: null,
    key: "3",
  },
];

const Activity = () => {
  const [upcomingList, setUpcomingList] = useState(dummyList);
  const addNewActivity = (event) => {
    setUpcomingList((prev) => {
      return [...prev, event];
    });
  };
  /*입력 form 관련 State들*/
 
  const [kakaoSearchInput, setKakaoSearchInput] = useState("");
  const kakaoSearchInputChangeHandler = (event) =>
    setKakaoSearchInput(event.target.value);

  const [imageUpload, setImageUpload] = useState(false);
  const [selectPlace, setSelectPlace] = useState(false);

  const imageUploadStateHandler = (e) => setImageUpload(e.target.checked);
  const selectPlaceStateHandler = (e) => setSelectPlace(e.target.checked);

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
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const addNewEventHandler = () => setIsAddingEvent(true);
  const doneAddingNewEventHandler = () => setIsAddingEvent(false);
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    // const newEvent = {
    //   meetingType: event.value.

    //   key : Math.random().toString(),
    // }
  };

  return (
    <div className={styles.activityPage}>
      <Card className="upcoming">
        <p style={{ fontWeight: 700, fontSize: "2rem" }}>Upcoming</p>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <div className={styles.newEventBtn} onClick={addNewEventHandler}>
            New Event
          </div>
        </div>
        {isAddingEvent /* 새 모임 생성하는 양식 */ && (
          <Card className="information">
            <form onSubmit={formSubmitHandler} className={styles.newEventForm}>
              <fieldset>
                <div className={styles.inputdivs}>
                  <input
                    name="meetingType"
                    id="discussion"
                    value="discussion"
                    type="radio"
                    defaultChecked
                  />
                  <label htmlFor="discussion">Discussion</label>
                  <input
                    name="meetingType"
                    id="activity"
                    value="activity"
                    type="radio"
                  />
                  <label htmlFor="activity">Activity</label>
                </div>

                <div className={styles.inputdivs}>
                  <label htmlFor="meetingDate">Date: </label>
                  <input
                    type="date"
                    name="meetingDate"
                    required
                    min={new Date()}
                  />
                </div>
                <div
                  className={styles.inputdivs}
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <label htmlFor="theme">Theme: </label>
                  <textarea rows="3" required></textarea>
                </div>
                <div className={styles.inputdivs}>
                  <label htmlFor="image">Select Place: </label>{" "}
                  <input
                    type="checkbox"
                    name="selectPlace"
                    onChange={selectPlaceStateHandler}
                  />
                  {selectPlace && (
                    <>
                      <Kakaomap searchinput={kakaoSearchInput} />
                      <div className ={styles.inputdivs}>
                        <label htmlFor="kakaoSearch">Search Place: </label>
                        <input
                          type="text"
                          name="kakaoSearch"
                          onChange={kakaoSearchInputChangeHandler}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.inputdivs}>
                  <label htmlFor="image">Image upload:</label>{" "}
                  <input
                    type="checkbox"
                    name="imageUpload"
                    onChange={imageUploadStateHandler}
                  />
                  {imageUpload && <input type="file" accept="image/*" />}
                </div>
                <div className={styles.action}>
                  <button type="submit">Add</button>
                  <button type="cancel" onClick={doneAddingNewEventHandler}>
                    Cancel
                  </button>
                </div>
              </fieldset>
            </form>
          </Card>
        )}
        {upcomingList.map((event) => {
          return (
            <Card className="information">
              {event.image === "" ? null : (
                <div style={{ width: "100%", height: "15rem" }}>
                  <img
                    style={{
                      width: "inherit",
                      height: "inherit",
                      objectFit: "fill",
                    }}
                    src={event.image}
                  />
                </div>
              )}
              <Kakaomap place={event.point} />
              {/* <div style={{width:'100%',height:'15rem',backgroundColor:"red"}}></div> */}
              <div className={styles.details}>
                <p>{event.date === "미정" ? "날짜 미정" : dateStr(event)}</p>
                <p>{event.topic}</p>
              </div>
            </Card>
          );
        })}
        <p style={{ fontWeight: 700, fontSize: "2rem", marginTop: "1rem" }}>
          Form Page
        </p>
        <Card className="container_form"> </Card>
      </Card>
    </div>
  );
};

export default Activity;
