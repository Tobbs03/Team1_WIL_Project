import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/AuthPages/SignUp/SignUp";
import SignIn from "./pages/AuthPages/SignIn/SignIn";
import Home from "./pages/HomePage/Home";
import Header from "./components/Header/Header";
import { AuthContext } from "./store/auth-context";
import ContactUs from "./pages/ContactUsPage/ContactUs";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Campaigns from "./pages/Campaigns/Campaigns";
import BusinessPromotions from "./pages/BusinessPromotions/BusinessPromotions";
import Blog from "./pages/Blog/Blog";

function App() {
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  return (
    <BrowserRouter>
      {authCtx.showHeader && <Header userData={userData} authCtx={authCtx} />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/Campaigns" element={<Campaigns />} />
        <Route path="/BusinessPromotions" element={<BusinessPromotions />} />
        <Route path="/Blogs" element={<Blog />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
