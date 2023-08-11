
import Mainpage from "./pages/Mainpage";
import Members from "./pages/Members";
import History from "./pages/History";
import Activity from "./pages/Activity";


import TopHeader from "./components/TopHeader";
import NavButton from "./components/NavButton";
import { Reset } from "styled-reset";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Reset /*reset css*/ />
      
      <Router>

        <NavButton />
        <TopHeader />

        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/members" element={<Members />} />
          <Route path="/history" element={<History />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
