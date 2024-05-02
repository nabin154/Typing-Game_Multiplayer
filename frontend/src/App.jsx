import "./App.css";
import {Routes, Route , BrowserRouter}  from 'react-router-dom';
import LoginSignupPage from "./pages/Authentication/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
import ChallengePage from "./pages/Home/ChallengePage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginSignupPage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/stats"} element={<ChallengePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
