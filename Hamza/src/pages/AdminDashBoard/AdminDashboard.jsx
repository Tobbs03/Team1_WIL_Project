import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap"; // Import React Bootstrap components
import Sidebar from "./Components/Sidebar.jsx";
import AdminHome from "./Components/AdminHome.jsx";
import CreateBusiness from "./Components/Business.jsx";
import CreatePromotion from "./Components/CreatePromotion.jsx";
import Cause from "./Components/Cause.jsx";
import Category from "./Components/Category.jsx";
import Alignment from "./Components/Alignment.jsx";
import Donation from "./Components/Donation.jsx";
import Nav from "./Components/Nav.jsx";
import { AuthContext } from "../../store/auth-context.js";
import "./AdminDashboard.css";
import Contact from "./Components/Contact.jsx";

const AdminDashboard = () => {
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const [toggle, settoggle] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authCtx) {
      handleShowHeader(location.pathname);
    }
  }, [authCtx, location.pathname]);

  const handleShowHeader = (path) => {
    if (path.includes("/admin")) {
      authCtx.headerSetter(false);
    }
  };

  return (
    <Container fluid className="custom-container">
      <Row className="w-100">
        {toggle && (
          <Col xs={3} className="m-0 p-0">
            <Sidebar />
          </Col>
        )}
        <Col className="h-100 m-0 p-0 mx-3">
          <Nav settoggle={settoggle} toggle={toggle} />
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="category" element={<Category />} />
            <Route path="cause" element={<Cause />} />
            {/* <Route path="create-user" element={<CreateUser />} /> */}
            <Route path="create-business" element={<CreateBusiness />} />
            <Route path="create-alignment" element={<Alignment />} />
            <Route path="create-donation" element={<Donation />} />
            <Route path="create-promotion" element={<CreatePromotion />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
