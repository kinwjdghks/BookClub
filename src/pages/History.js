import styles from "./History.module.css";
import BookCanvas from "../components/BookCanvas";
import { useState,useReducer,useRef, useEffect } from "react";
import add_circle from "../Images/add_circle.svg";
import Card from "../UI/Card";


const History = () => {
  const [isOpenedBox,setIsOpenedBox] = useState(false);
  const [isValid,setIsValid] = useState(false);

  const closeBox = (e) => {
    e.preventDefault();
    Refs_Cate.current.value="";
    Refs_Content.current.value="";
    Refs_Parent.current.value="";
    Refs_Pos_x.current.value="";
    Refs_Pos_y.current.value="";
    setNewCate("");
    setNewContent("");
    setNewParent("");
    setNewPos_x(0);
    setNewPos_y(0);
    setIsOpenedBox(false);
};
//add node를 위한 State와 refs

  const [newCate,setNewCate] = useState("장르");
  const [newContent,setNewContent] = useState("");
  const [newParent,setNewParent] = useState("");
  const [newPos_x,setNewPos_x] = useState(0);
  const [newPos_y,setNewPos_y] = useState(0);
  const Refs_Cate = useRef();
  const Refs_Content = useRef();
  const Refs_Parent = useRef();
  const Refs_Pos_x = useRef();
  const Refs_Pos_y = useRef();
  
//   useEffect(()=>{
//     if(newCate==='장르'){
//         setIsValid(newContent.toString().trim.length
//         && newPos_x.toString().trim.length
//         newContent.toString().trim.length);
//     }
//   },[newCate,newContent,newParent,newPos_x,newPos_y]);

  return (
    <div className={styles.historyPage}>
      <div className={styles.bookCanvas}>
        <BookCanvas />
        <div className={`${styles.manageBox} ${isOpenedBox && styles.opened}`} onClick={()=>setIsOpenedBox(true)}>
            {!isOpenedBox && 
            <div className={styles.closedcontent}>
                <img src={add_circle} style={{width:'1.5rem', height:'1.5rem'}} />
                <div className={styles.edit}>히스토리 편집</div>
            </div>}
            {isOpenedBox && <div className={styles.openedcontent}>
                <form className={styles.form}>
                    <div className={`${styles.block} ${styles.category}`}>
                        <div className={`${styles.lbl} ${styles.category}`}>카테고리:</div>
                        <select name="category" ref={Refs_Cate} onChange={(e)=>setNewCate(e.target.value)}>
                            <option value="장르">장르</option>
                            <option value="주제">주제</option>
                            <option value="책">책</option>
                        </select>
                    </div>
                    
                    {newCate && <div className={`${styles.block} ${styles.category}`}>
                        <div className={`${styles.lbl} ${styles.content}`}>
                            {newCate !== "책" ? newCate : "책 제목"}:
                        </div>
                        <input name="content" type='text' required onChange={(e)=>setNewContent(e.target.value)} ref={Refs_Content}/>
                    </div>}
                    {(newCate!=="장르") && <div className={`${styles.block} ${styles.category}`}>
                        <div className={`${styles.lbl} ${styles.parent}`}>루트:</div>
                        <input name="parent" type='text' required onChange={(e)=>setNewParent(e.target.value)} ref={Refs_Parent}/>
                    </div>}
                    <div className={`${styles.block} ${styles.category}`}>
                        <div className={`${styles.lbl} ${styles.pos}`}>위치:</div>
                        (x <input name="xpos" type='number' required onChange={(e)=>setNewPos_x(e.target.value)} ref={Refs_Pos_x}/>
                        y <input name="ypos" type='number' required onChange={(e)=>setNewPos_y(e.target.value)} ref={Refs_Pos_y}/>)
                    </div>
                </form>
                <div className={styles.action}>
                    <button type='submit'>확인</button>
                    <button type='button' onClick={closeBox}>취소</button>
                </div>
            </div> }
        </div>
      </div>
    </div>
  );
};

export default History;
