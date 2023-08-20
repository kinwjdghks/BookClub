import styles from "./NavButton.module.css";
import { useNavigate } from "react-router-dom";
import {useState,useEffect,useContext} from 'react';
import AuthContext from "../Context/context/auth_context";

const NavButton = () => {
    const AUTH = useContext(AuthContext);

    const [isCatOpen,setIsCatOpen] = useState(false);
    const [firstRender,setFirstRender] = useState(true);
    useEffect(()=>{setFirstRender(false);},[]);
    
    const toggleCat=()=>setIsCatOpen((prev)=>!prev);

    const navigate = useNavigate();
    const moveto = (to) =>{
        navigate(to);
        toggleCat();
    }

  return (
    <>
      
      <div className={`${styles.sidebar} ${isCatOpen && styles.active}`}>
        <div className={styles.container_menu}>
          <ul>
            <li onClick={()=>moveto("./members")}>Members</li>
            <li onClick={()=>moveto("./history")}>History</li>
            <li onClick={()=>{
              if(AUTH.isLoggedIn) moveto("./activity");
              else moveto("./oops");
            }}>Activity</li>
            
          </ul>
        </div>
      </div>
      <div className={`${styles.modal} ${isCatOpen && styles.active}`} onClick={toggleCat}></div>
      <div className={styles.hamburger} onClick={toggleCat}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default NavButton;
