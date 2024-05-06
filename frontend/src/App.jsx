import "./App.css";
import {Routes, Route , BrowserRouter}  from 'react-router-dom';
import LoginSignupPage from "./pages/Authentication/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
// import ChallengePage from "./pages/Home/ChallengePage";
import StatsPage from "./pages/stats/StatsPage";
import ToastProvider from "./Context/ToastProvider";
import Toast from "./components/UI/Toast";
import Loader from "./components/UI/Loader";
import UserProvider from "./Context/UserProvider";


function App() {
  return (
    <>
      <ToastProvider>
        <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginSignupPage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/stats"} element={<StatsPage />} />
        </Routes>
          <Toast />

      </BrowserRouter>
        </UserProvider>
        </ToastProvider>
    </>
  );
}

export default App;
