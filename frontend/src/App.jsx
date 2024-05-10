import "./App.css";
import {Routes, Route , BrowserRouter}  from 'react-router-dom';
import LoginSignupPage from "./pages/Authentication/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
import StatsPage from "./pages/stats/StatsPage";
import ToastProvider from "./Context/ToastProvider";
import Toast from "./components/UI/Toast";
import UserProvider from "./Context/UserProvider";
import Protected from "./components/Authentication/Protected";
import Notification from "./components/Modal/Notification";
import GoogleLogin from "./components/Authentication/GoogleLogin";


function App() {
  return (
    <>
      <ToastProvider>
        <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LoginSignupPage />} />
          <Route path={"/googlelogin"} element={<GoogleLogin />} />
              <Route path={"/home"} element={<Protected> <HomePage /></Protected>} />
              <Route path={"/stats"} element={<Protected> <StatsPage /></Protected>} />
        </Routes>
          <Toast />
            <Notification />


      </BrowserRouter>
        </UserProvider>
        </ToastProvider>
    </>
  );
}

export default App;
