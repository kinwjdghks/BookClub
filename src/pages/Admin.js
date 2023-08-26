import styles from './Admin.module.css';
import { useState,useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, deleteDoc, setDoc, doc } from "firebase/firestore/lite";

const fetchData = async (collectionName) => {
    const dataSnapShot = await getDocs(collection(db,collectionName));
    const dataList = dataSnapShot.docs.map(doc => doc.data());
        
    return dataList;
};

const Admin = () =>{

    const RequestHandler = async (e,data) =>{
        e.preventDefault();
        const id = data['id'];
        const remove = await deleteDoc(doc(collection(db,"accountREQ"),id));
        if(e.target['name']==="accept"){
            const accounts = collection(db,"accounts");
            reqlist.forEach(async (account)=>{
                if(account['id']===id){
                    const add = await setDoc(doc(accounts,id),account);
                    console.log(account['admin']);
                }
            })
            
        }
    }
    const setAdminHandler = (e,doc) =>{
        
        const id = doc['id'];
        const newReqlist = reqlist.map(item => {
            if (item['id'] === id) {
                return { ...item, admin: e.target.checked };
            }
            return item;
        });
        setReqlist(newReqlist);
    }

    const [reqlist,setReqlist] = useState([]);
    useEffect(()=>{
        const fetchandSetState = async () =>{
        const data = await fetchData("accountREQ");
        setReqlist(data);
        }
        fetchandSetState();
    },[]);
    // useEffect(()=>{
        // reqlist.forEach((doc)=>console.log(doc)); 
        // console.log('reqlist updated');    
    // },[reqlist]);

    return <div className={styles.adminPage}>
        <div className = {styles.accountManage}>
        <div className = {styles.reqlist}>
            REQUESTS LIST
            <ul>
                {reqlist.map((doc)=>{
                return <li className={styles.request} key={doc["id"]}>
                    <p>name: {doc["name"]}</p>
                    <p>id: {doc["id"]}</p>
                    <div className={styles.action}>
                    <div htmlFor='admin'>Admin? <input type="checkbox" name="admin" onChange={(e)=>setAdminHandler(e,doc)}/></div>
                    <div style={{display:'inline',marginRight:'1rem'}} htmlFor='accept'>Accept <button className={styles.button} name='accept' onClick={(e)=>RequestHandler(e,doc)}>Accept</button></div>
                    <div style={{display:'inline'}} htmlFor='decline'>Decline <button className={styles.button} name="decline" onClick={(e)=>RequestHandler(e,doc)}>Decline</button></div>
                    </div>
                    </li>})}
            </ul>

        </div>

        </div> 
    </div>
}

export default Admin;