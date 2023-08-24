import styles from "./NavButton.module.css";
import { useNavigate } from "react-router-dom";
import {useState,useEffect,useContext,useRef} from 'react';
import AuthContext from "../Context/context/auth_context";
import LoginCard from "./LoginCard";

const NavButton = () => {
    const AUTH = useContext(AuthContext);

    const [isCatOpen,setIsCatOpen] = useState(false);
    const [isLoginOpen,setIsLoginOpen] = useState(false);
    const toggleLogin = () => setIsLoginOpen((prev)=>setIsLoginOpen(!prev));
   
    const toggleCat=()=>{
      if(isCatOpen) setIsLoginOpen(false);
      setIsCatOpen((prev)=>!prev);
    }
    const categoryRef = useRef();
    const navigate = useNavigate();
    const moveto = (to) =>{
        navigate(to);
        toggleCat();
    }



    useEffect(()=>{
      if(isCatOpen){
        const scrollPos = document.querySelector('html').scrollTop;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPos}px`;
        document.body.style.width = '100%';

        return () => {
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('position');
          document.body.style.removeProperty('top');
          document.body.style.removeProperty('width');
          window.scrollTo(0, scrollPos);
        }
      }
    },[isCatOpen]);

  return (
    <>
  
      <div className={`${styles.sidebar} ${isCatOpen && styles.active}`} ref={categoryRef}>
        <div className={styles.container_menu}>
          <ul>
            <li onClick={()=>moveto("./members")}>Members</li>
            <li onClick={()=>moveto("./history")}>History</li>
            <li onClick={()=>{
              if(AUTH.isLoggedIn) moveto("./activity");
              else moveto("./oops");
            }}>Activity</li>
            <li onClick={()=>{AUTH.loginToggle(); toggleLogin();}}>Login</li>
          </ul>
        </div>
      <LoginCard isLoginOpen={isLoginOpen}/>
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
