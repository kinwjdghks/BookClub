
import Mainpage from "./pages/Mainpage";
import Members from "./pages/Members";
import History from "./pages/History";
import Activity from "./pages/Activity";
import AuthFailPage from "./pages/AuthFailPage";


import TopHeader from "./components/TopHeader";
import NavButton from "./components/NavButton";
import { Reset } from "styled-reset";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./Context/context/auth_context";
function App() {
  return (
    <div>
      <Reset /*reset css*/ />
      
      <AuthContext.Provider value={{isLoggedIn: false}}>
        <Router>

          <NavButton />
          <TopHeader />

          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/members" element={<Members />} />
            <Route path="/history" element={<History />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/oops" element={<AuthFailPage/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
