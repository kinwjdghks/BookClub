import login from "../Images/login.svg";
import peek from "../Images/visibility_on.svg";
import peek_off from "../Images/visibility_off.svg";
import register from "../Images/register.svg";
import styles from "./LoginCard.module.css";
import { useState,useReducer,useEffect } from "react";

const nameReducer = (state,action) =>{
    if(action.type==="USER_INPUT_NAME") {
        const name = action.value.toString().trim(); 
        if(name.length<2 || name.length>5) return {value: name, isValid:false, err:"2~5자 이내의 성을 포함한 이름을 입력해주세요."};
        if((new RegExp(/^[가-힣]+$/)).test(name)) return {value: name, isValid:false, err:"한글 이름을 입력해주세요"};
        return {value: action.value, isValid:true, err: null};
        }
}
const idReducer = (state,action) =>{
    if(action.type==="USER_INPUT_ID") {
        const id = action.value.toString().trim(); 
        if(id.length<5 || id.length>15) return {value: id, isValid:false, err:"아이디는 최소 5자 최대 15자입니다."};
        if((new RegExp(/^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/gi)).test(id)) return {value: id, isValid:false, err:"아이디는 영문과 숫자로만 구성되어야 합니다. (숫자만은 불가)"};
        return {value: action.value, isValid:true, err: null};
        }
}
const pwReducer = (state,action) =>{
    if(action.type==="USER_INPUT_PW") {
        const pw = action.value.toString().trim(); 
        if(pw.length<6 || (new RegExp(/^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/gi)).test(pw))  return {pw: pw, pwc:state.pwc, isValid:false, isChecked:false, err:"비밀번호는 영문과 숫자가 포함된 6자리 이상이어야 합니다."};
        else if((new RegExp(/^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/gi)).test(pw)) return {pw:pw, pwc: state.pwc, isValid:false, isChecked:false, err:"아이디는 영문과 숫자로만 구성되어야 합니다.(영문 반드시 포함)"};
        else if(pw===state.pwc) return {pw: pw, pwc:state.pwc, isValid:true, isChecked:true, err: null};
        else
            return {pw: pw, pwc:state.pwc, isValid:true, isChecked:false, err: "비밀번호가 일치하지 않습니다."};
        }
    else if(action.type==="USER_INPUT_PW_CHECK"){
        const pwc = action.value.toString().trim();
        if(!state.isValid) return {pw: state.pw, pwc:pwc, isValid:false, isChecked:false, err: "비밀번호를 다시 설정해 주세요."};
        else if(state.pw !== pwc) return {pw: state.pw, pwc:pwc, isValid:true, isChecked:false, err: "비밀번호가 일치하지 않습니다."};
        else return {pw: state.pw, pwc:pwc, isValid:true, isChecked:true, err: null};
    }
}

const LoginCard = ({isLoginOpen}) => {
    
    //비밀번호 peeking State
    const [peekPW,setPeekPW] = useState(false);
    const peekPWToggle = () => setPeekPW((prev)=>!prev);
    const [peekPWC,setPeekPWC] = useState(false);
    const peekPWCToggle = () => setPeekPWC((prev)=>!prev);
    //login/register모드 
    const [loginMode,setLoginMode] = useState(true); //true:login, false:register
    const toggleLoginMode = () => setLoginMode((prev)=>!prev);
    
    //login valid State
    const [nameState,dispatchName] = useReducer(nameReducer,{
        value:'',
        isValid:false,
        err:null
    })
    const [idState, dispatchID] = useReducer(idReducer,{
        value:'',
        isValid:false,
        err:null
    })
    const [pwState, dispatchPW] = useReducer(pwReducer,{
        pw:'',
        pwc:'',
        isValid:false,
        isChecked:false,
        err:null
    })

    const nameChangeHandler = (e) =>{
        dispatchID({type:"USER_INPUR_NAME",value: e.target.value});
    }
    const idChangeHandler = (e) => {
        dispatchID({type:"USER_INPUT_ID", value: e.target.value});
    }
    const pwChangeHandler = (e) => {
        dispatchPW({type:"USER_INPUT_PW", value: e.target.value});
    }
    const pwcChangeHandler = (e) => {
        dispatchPW({type:"USER_INPUT_PW_CHECK", value: e.target.value});
    }

    const [isInputValid,setIsInputValid] = useState(false); //login 버튼 활성화/비활성화
    const [errorMessage,setErrorMessage] = useState(null);
    
    useEffect(()=>{
        setIsInputValid(nameState.isValid && idState.isValid && pwState.isValid);
        if(nameState.err) setErrorMessage(nameState.err);
        else if(idState.err) setErrorMessage(idState.err);
        else if(pwState.err) setErrorMessage(pwState.err);
        else setErrorMessage(null);
    },[idState,pwState]); //최종 validity 판단

    const loginHandler = (e) => {
        e.preventDefault();
        if(loginMode){ //로그인 

        }
        else{ //회원가입
            //1. input 유효성 확인
            if(!isInputValid){
                //에러메시지 띄우기

                return;
            }
            //2. 회원 계정 객체 생성해서 firebase에 전송
            const newAccount = {
                id: idState.id,
                pw: pwState.pw,
                admin: false,

            }
            //3. 로그인 모드로 넘어가기
        }
    }

  return (
    <div className={`${styles.container} ${isLoginOpen && styles.active}`}>
      <form className={styles.loginCard} onSubmit={(e)=>loginHandler()}>
        <div className={`${styles.input} ${styles.name}`}>
            <label className={styles.labels} htmlFor="name">NAME</label>
            <input className={styles.txtinput} type="text" name="name" onChange={(e)=>nameChangeHandler(e)}/>
        </div>

        <div className={`${styles.input} ${styles.userid}`}>
            <label className={styles.labels} htmlFor="userid">ID</label>
            <input className={styles.txtinput} type="text" name="userid" onChange={(e)=>idChangeHandler(e)}/>
        </div>
       
        <div className={`${styles.input} ${styles.userpw}`}>    
            <label className={styles.labels} htmlFor="userpw">PW</label>
            <input className={styles.txtinput} type={peekPW ? 'text' : 'password'} name="userpw" onChange={(e)=>pwChangeHandler(e)}/>
            <img src={login} className={`${styles.btn_login} ${isInputValid && styles.active} ${!loginMode && styles.register}`} onClick={loginHandler}/>
            <img src={peekPW ? peek : peek_off} className={styles.btn_peek} onClick={peekPWToggle}/>
        </div>
        
        <div className={`${styles.input}  ${styles.userpwcheck} ${!loginMode && styles.active}`}>
            <label className={styles.labels} htmlFor="userpwcheck">PW CHECK</label>
            <input className={`${styles.txtinput} ${styles.userpwcheck}`} type={peekPWC ? 'text' : 'password'} name="userpwcheck" onChange={(e)=>pwcChangeHandler(e)}/>
            <img src={peekPWC ? peek : peek_off} className={styles.btn_peek} onClick={peekPWCToggle}/>
        </div>
        
        <div className={`${styles.toRegisterBox} ${loginMode && styles.active}`} >
            <img src={register} style={{height:'1.5rem',width:'1.5rem',marginLeft:'8rem'}}/>
            <p onClick={toggleLoginMode} className={styles.toRegister}>Register</p>
        </div>

      </form>
      <div className={styles.registerCard}></div>
    </div>
  );
};

export default LoginCard;
