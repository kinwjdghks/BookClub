import styles from './Mainpage.module.css';
import bookimg from '../Images/쓸모있는경제학.png';
import prevbookimg from '../Images/메리골드.png';

const Mainpage = () =>{

    return(
        <div className={styles.mainpage}>
            <div className={styles.Gallery}>
                <div className={styles.ongoingBook}>
                    <div className={`${styles.imgcontainer} ${styles.ongoingBook}`}>
                        <img className={`${styles.img} ${styles.ongoingBook}`} src={bookimg}/>  
                    </div>
                    <div className={`${styles.imgcontainer} ${styles.prevBook}`}>
                        <img className={`${styles.img} ${styles.prevBook}`} src={prevbookimg}/>  
                    </div>

                </div>


                <div className={styles.Recommended}></div>
            </div>
            
            <div className={styles.Notice}></div>
            


        </div>
    );
}

export default Mainpage;