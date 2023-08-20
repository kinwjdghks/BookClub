import React, {useState} from 'react';
import AuthContext from "../context/auth_context";

const AuthContextProvider = ({children}) =>{
    const loginHandler = () => setLoginState(true);
    const logoutHandler = () => setLoginState(false);
    const initialState = {
        isLoggedin:false,
        loginHandler,
        logoutHandler,
    }
    const [loginState,setLoginState] = useState(initialState);


    return <AuthContext.Provider value={loginState}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;