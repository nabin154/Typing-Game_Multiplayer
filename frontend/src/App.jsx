import "./App.css";
import {Routes, Route , BrowserRouter}  from 'react-router-dom';
import LoginSignupPage from "./pages/Authentication/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
// import ChallengePage from "./pages/Home/ChallengePage";
import StatsPage from "./pages/stats/StatsPage";
import ToastProvider from "./Context/ToastProvider";
import Toast from "./components/UI/Toast";


function App() {
  return (
    <>
      <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginSignupPage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/stats"} element={<StatsPage />} />
        </Routes>
          <Toast />

      </BrowserRouter>
        </ToastProvider>
    </>
  );
}

export default App;
