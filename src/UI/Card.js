import styles from './Card.module.css';

const Card = ({className, children}) =>{
    return(
        <div className = {`${styles.Card} ${styles[className]}`}>
            {children}
        </div>
    )
}

export default Card;