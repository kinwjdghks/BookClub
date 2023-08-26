import styles from "./Members.module.css";
import Card from "../UI/Card";
import personIcon from "../Images/personIcon.svg";
const Members = () => {
  const memberList = [
    {
      name: "박윤진",
      position: "회장",
      intro: "",
    },
    {
      name: "이다혜",
      position: "부회장",
      intro: "",
    },
    {
      name: "정정환",
      position: "기획부장",
      intro: "",
    },
    {
      name: "양영준",
      position: "멤버",
      intro: "",
    },
    {
      name: "유건",
      position: "멤버",
      intro: "",
    },
    
    {
      name: "김이수",
      position: "멤버",
      intro: "",
    },
    {
      name: "노혜원",
      position: "멤버",
      intro: "",
    },
    {
      name: "박성욱",
      position: "멤버",
      intro: "",
    },
    {
      name: "이호승",
      position: "멤버",
      intro: "",
    },
  ];

  return (
    <div className={styles.membersPage}>
      <div className={styles.container_members}>
        {memberList.map((person,index) => {
          return <Card className="container_person" key={index}>
            <div className={styles.container_icon}>
                <img src={personIcon} alt="member"/>
            </div>
            <div className={styles.details}>
                <p className={styles.name}>{person.name}</p>
                <p className={styles.position}>{person.position}</p>
                <p className={styles.intro}>{person.intro}</p>
            </div>
          </Card>;
        })}
      </div>
    </div>
  );
};

export default Members;
