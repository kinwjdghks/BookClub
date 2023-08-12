import styles from "./Members.module.css";
import Card from "../UI/Card";
import personIcon from "../Images/personIcon.svg";
const Members = () => {
  const memberList = [
    {
      name: "박윤진",
      position: "회장",
      intro: "나는야 박윤진",
    },
    {
      name: "이다혜",
      position: "부회장",
      intro: "나는야 이다혜",
    },
    {
      name: "양영준",
      position: "멤버",
      intro: "나는야 양영준",
    },
    {
      name: "유건",
      position: "멤버",
      intro: "나는야 유건",
    },
    {
      name: "정정환",
      position: "멤버",
      intro: "나는야 정정환",
    },
    {
      name: "김이수",
      position: "멤버",
      intro: "나는야 김이수",
    },
    {
      name: "노혜원",
      position: "멤버",
      intro: "나는야 노혜원",
    },
    {
      name: "박성욱",
      position: "멤버",
      intro: "나는야 박성욱",
    },
    {
      name: "이호승",
      position: "멤버",
      intro: "나는야 이호승",
    },
  ];

  return (
    <div className={styles.membersPage}>
      <div className={styles.container_members}>
        {memberList.map((person) => {
          return <Card className="container_person">
            <div className={styles.container_icon}>
                <img src={personIcon}/>
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
