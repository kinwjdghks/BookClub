import styles from "./NavButton.module.css";
import { useNavigate } from "react-router-dom";
import {useRef} from 'react';

const NavButton = () => {
    
    const modalRef = useRef();
    const sidebarRef = useRef();
    const modalExit = () =>{
        modalRef.current.style.opacity = 0;
        sidebarRef.current.style.transform = "translate(-100%,0)";
        setTimeout(
            ()=>{modalRef.current.style.display = 'none';}
            ,500
        );
       
        document.body.style.position = '';
        
    }
    const modalEnter = () =>{
        modalRef.current.style.display = 'block';
        
        modalRef.current.style.opacity = 0.5;
        sidebarRef.current.style.transform = "translate(0%,0)";
        
        document.body.style.position = 'fixed';
        
    }
    const navigate = useNavigate();

    const moveto = (to) =>{
        navigate(to);
        modalExit();
    }

  return (
    <>
    
      <div className={styles.hamburger} onClick={modalEnter}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.sidebar} ref={sidebarRef} >
        <div className={styles.container_menu}>
          <ul>
            <li onClick={()=>moveto("./members")}>Member</li>
            <li onClick={()=>moveto("./history")}>History</li>
            <li onClick={()=>moveto("./activity")}>Activity</li>
          </ul>
        </div>
      </div>
      <div className={styles.modal} onClick={modalExit} ref = {modalRef}></div>
    </>
  );
};

export default NavButton;
