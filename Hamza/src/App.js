import { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SignUp from "./pages/AuthPages/SignUp/SignUp";
import SignIn from "./pages/AuthPages/SignIn/SignIn";
import Vision from "./pages/VisionPage/Vision";
import Causes from "./pages/CausesPage/Causes";
import CreateCause from "./pages/CausesInnerPages/CreateCausePage/CreateCause";
import CauseDesc from "./pages/CausesInnerPages/CauseDescPage/CauseDesc";
import Home from "./pages/HomePage/Home";
import Header from "./components/Header/Header";
import { AuthContext } from "./store/auth-context";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ContactUs from "./pages/ContactUsPage/ContactUs";
import Advertisement from "./pages/AdvertisementPage/Advertisement";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./pages/AdminDashBoard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Donation from "./pages/Donationpage/Donation";
// const ProtectedRoute = ({ user, children }) => {
//   if (!user) {
//     return <Navigate to="/home" replace />;
//   }

//   return children;
// };

function App() {
  const authCtx = useContext(AuthContext);
  // const location = useLocation();
  const userData = JSON.parse(authCtx.userToken);
  const adminData = JSON.parse(authCtx.adminToken);
  const { isLoggedIn } = useContext(AuthContext);
  // console.log(location);
  // console.log("user: ", userData);
  // console.log("admin: ", adminData);

  return (
    <BrowserRouter>
      {authCtx.showHeader && <Header userData={userData} authCtx={authCtx} />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/causes" element={<Causes />} />
        <Route path="/causes/create-cause" element={<CreateCause />} />
        <Route path="/causes/cause-description" element={<CauseDesc />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/advertisement" element={<Advertisement />} />
        <Route
          path="/Donation"
          element={
            <ProtectedRoute isloggedIn={isLoggedIn}>
              <Donation />
            </ProtectedRoute>
          }
        />
        {!userData ? (
          <>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}

        {/* {adminData && <Route path="/admin" element={<AdminDashboard />} />} */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
