//로그인 상태관리
import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn:false,
    });

export default AuthContext;
