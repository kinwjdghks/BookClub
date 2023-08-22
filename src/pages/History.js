import styles from './History.module.css';
import BookCanvas from '../components/BookCanvas';
import Card from '../UI/Card';

const History = () =>{



    return(
        <div className = {styles.historyPage}>
            <BookCanvas/>
        </div>
    )
}

export default History;