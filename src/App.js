
import Mainpage from "./pages/Mainpage";
import Members from "./pages/Members";
import History from "./pages/History";
import Activity from "./pages/Activity";
import AuthFailPage from "./pages/AuthFailPage";
import Admin from "./pages/Admin";

import TopHeader from "./components/TopHeader";
import NavButton from "./components/NavButton";
import { Reset } from "styled-reset";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./Context/provider/AuthContextProvider";
function App() {
  return (
    <div>
      <Reset /*reset css*/ />
      
      <AuthContextProvider>
        <Router>

          <NavButton />
          <TopHeader />

          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/members" element={<Members />} />
            <Route path="/history" element={<History />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/oops" element={<AuthFailPage/>}/>
            <Route path="/admin" element = {<Admin/>}/>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
