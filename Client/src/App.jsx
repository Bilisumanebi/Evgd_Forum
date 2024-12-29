import {  Route, Routes, useNavigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
// import components
import About from './Components/About/About'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import ResetPassword from "./Components/ResetPassword/ResetPassword";

// import pages
import Answer from './Pages/Answers/Answer'
import Home from './Pages/Home/Home'
import Landing from './Pages/Landing/Landing'
import AskQuestion from './Pages/Question/AskQuestion/AskQuestion'
import axiosBase from './utility/axios'



export const AppState = createContext();
function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      const { data } = await axiosBase.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");

      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <AppState.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/question/:question_id" element={<Answer />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<AskQuestion />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </AppState.Provider>
    </>
  );
}

export default App
