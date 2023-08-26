import React, {useState} from 'react';
import AuthContext from "../context/auth_context";

const AuthContextProvider = ({children}) =>{
    const loginToggle = () => setLoginState(prevState => {return {...prevState, isLoggedIn: !prevState.isLoggedIn}});
    
    const initialState = {
        isLoggedIn:false,
        admin:false,
        loginToggle: loginToggle
    }
    const [loginState,setLoginState] = useState(initialState);


    return <AuthContext.Provider value={loginState}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;