import "./App.css";
import {Routes, Route , BrowserRouter}  from 'react-router-dom';
import LoginSignupPage from "./pages/Authentication/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
import ChallengePage from "./pages/Home/ChallengePage";
import StatsPage from "./pages/stats/StatsPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginSignupPage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/stats"} element={<StatsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
