import ReactDOM from "react-dom";
import Card from "./Card";
import styles from './Modal.module.css';

const Backdrop= (props)=>{

    
    return(<div className={styles.backdrop} onClick={props.onClick}></div>);
}

const ModalOverlay = (props)=> {return(<Card className="modal">
<header className={styles.header}>
    <h2>{props.title}</h2>
</header>
<div className={styles.content}>
    {props.children}
</div>
{/* <footer className={styles.actions}>
    <button onClick={props.onSubmit}>Add</button>
    <button onClick={props.onCancel}>Cancel</button>
</footer> */}

</Card>);
}

const Modal=(props)=>{

    return (
    <>
    {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>,document.getElementById('backdrop-root'))}
    {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message}>
        {props.children}</ModalOverlay>,document.getElementById('overlay-root'))}
    </>);
}

export default Modal;