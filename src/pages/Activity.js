import styles from "./Activity.module.css";
import Card from "../UI/Card";
import Kakaomap from "../UI/KakaoMap";
import snowboard from "../Images/snowboard.jpeg";
import noImage from "../Images/noImage.png";
// import Modal from "../UI/Modal";
import { useState,useRef, useEffect } from "react";

const dummyList = [
  {
    meetingType: "discussion",
    place: {y:37.49798640766797,x: 127.02764966969421},
    placename:"강남역",
    date: new Date("2023-08-27"),
    theme: "경제",
    image: null,
    key: "1",
  },
  {
    meetingType: "discussion",
    place: {y:37.50450137396596,x:127.02450799203919},
    placename:"신논현역",
    date: new Date("2023-09-10"),
    theme: "문학",
    image: null,
    key: "2",
  },
  {
    meetingType: "activity",
    place: null,
    placename: null,
    date: "미정",
    theme: "스키여행",
    // image: snowboard,
    image:null,
    key: "3",
  },
];

const Activity = () => {
  const [upcomingList, setUpcomingList] = useState(dummyList);
  const addNewActivity = (event) => {
    setUpcomingList((prev) => {
      return [event,...prev];
    });
  };
  /*입력 form 관련 State/Ref들*/
  const [meetingType,setMeetingType] = useState('discussion');
  const meetingTypeStateHandler = (event) =>{
    setMeetingType(event.target.value);
  }
  const ref_date = useRef();
  const ref_theme = useRef();
  const imagePreview = useRef();


  const [kakaoSearchInput, setKakaoSearchInput] = useState(""); //장소를 검색할 키워드 인풋
  const kakaoSearchInputChangeHandler = (event) =>
    setKakaoSearchInput(event.target.value);
  const [placeSearchOutput, setPlaceSearchOutput] = useState(null);
  const [placeNameSearchOutput, setPlaceNameSearchOutput] = useState("");
  const placeSearchOutputHandler = (e) => {
    setPlaceSearchOutput(e.coor);
    setPlaceNameSearchOutput(e.name);
  }
  
  const [imageUpload, setImageUpload] = useState(false);
  const imageUploadStateHandler = (e) => setImageUpload(e.target.checked);
  const [imageFile,setImageFile] = useState(null);
  const imageFileHandler = (e) => setImageFile(e.target.files[0]);
  const [isSelectingPlace, setIsSelectingPlace] = useState(false);
  const isSelectingPlaceStateHandler = (e) =>{
    setIsSelectingPlace(e.target.checked);
    if(e.target.checked===false){
      setPlaceSearchOutput(null);
    }
  }
  /*이미지 처리 코드*/
  useEffect(()=>{
    if(imageFile == null) return;
    // console.log(imageFile);
    imagePreview.current.src = URL.createObjectURL(imageFile);
  },[imageFile]);

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
    
    // 입력 유효성 확인
    const input_date = ref_date.current.value;
    const input_theme = ref_theme.current.value.toString().trim();
    
    if(input_theme===''){
      alert("활동 내용을 입력해주세요.");
      return;
    }
    if(isSelectingPlace && placeSearchOutput==null){
      alert("약속 장소를 확정해주세요.");
      return;
    }
  

    const newEvent = {
      meetingType: meetingType,
      place: placeSearchOutput,
      placename: placeNameSearchOutput,
      date: new Date(input_date),
      theme: input_theme,
      image: imageFile, 
      key : Math.random().toString(),
    }
    
    addNewActivity(newEvent);
    setIsAddingEvent(false);
    setIsSelectingPlace(false);
    setKakaoSearchInput("");
    setImageUpload(false);
    setImageFile(null);
  };

  return (
    <div className={styles.activityPage}>
      <Card className="upcoming">
        <p style={{ fontWeight: 700, fontSize: "2rem" }}>Upcoming Event</p>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <div className={`${styles.newEventBtn} ${isAddingEvent ? styles.clicked : ''}`} onClick={addNewEventHandler}>
            New Event
          </div>
        </div> 
        
        {isAddingEvent && /* 새 모임 생성하는 양식 */
        (<Card className="information">
            <form onSubmit={formSubmitHandler} className={styles.newEventForm} method="post" encType="multipart/form-data">
              <fieldset>
                <div className={styles.inputdivs}>
                  <input
                    name="meetingType"
                    id="discussion"
                    value="discussion"
                    type="radio"
                    defaultChecked
                    onChange={meetingTypeStateHandler}
                  />
                  <label htmlFor="discussion">Discussion</label>
                  <input
                    name="meetingType"
                    id="activity"
                    value="activity"
                    type="radio"
                    onChange={meetingTypeStateHandler}
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
                    ref={ref_date}
                  />
                </div>
                <div
                  className={styles.inputdivs}
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <label htmlFor="theme">Theme: </label>
                  <textarea rows="3" required placeholder={
                    meetingType==='discussion' ? "책제목과 토론주제를 적어주세요."
                    : meetingType === 'activity' ? "활동 내용을 적어주세요." : "" 
                  }
                  ref={ref_theme}></textarea>
                </div>
                <div className={styles.inputdivs}>
                  <label htmlFor="image">Select Place: </label>{" "}
                  <input
                    type="checkbox"
                    name="selectPlace"
                    onChange={isSelectingPlaceStateHandler}
                  />
                  {isSelectingPlace && (
                    <>
                      <div className={styles.inputdivs}>
                        <label htmlFor="kakaoSearch">Search: </label>
                        <input
                          type="search"
                          name="kakaoSearch"
                          onChange={kakaoSearchInputChangeHandler}
                        />
                      </div>
                      <Kakaomap
                        searchinput={kakaoSearchInput}
                        onSearch={placeSearchOutputHandler}
                       
                      />
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
                  {imageUpload && <><input type="file" accept="image/*" onChange={imageFileHandler}/>
                  <div className={styles.imgPreviewContainer}><img ref={imagePreview} src={noImage} style={{objectFit:"fit", width:'inherit',height:'inherit'}}/></div></>}
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
            <Card className="information" key={event.key}>
              {event.image === null ? null : (
                <div style={{ width: "100%", height: "15rem", marginBottom:"1rem" }}>
                  <img
                    style={{
                      width: "inherit",
                      height: "inherit",
                      objectFit: "fill",
                    }}
                    src={window.URL.createObjectURL(event.image)}
                  />
                </div>
              )}
              {event.place !=null && <Kakaomap place={event.place} onSearch={placeSearchOutputHandler} placename={event.placename}/>}
              {/* <div style={{width:'100%',height:'15rem',backgroundColor:"green"}}></div> */}
              <div className={styles.details}>
                <p>{event.date === "미정" ? "날짜 미정" : dateStr(event)}</p>
                <p>{event.theme}</p>
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
