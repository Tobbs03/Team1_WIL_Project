import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useContext } from "react";
import "./Nav.css";
import { AuthContext } from "../../../store/auth-context";
function Navigation({ settoggle, toggle }) {
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const navigate = useNavigate();

  const handleLogout = () => { 
    authCtx.adminLogout();
    authCtx.headerSetter(true);
    navigate("/home");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => settoggle(!toggle)}>
          <i className="fa-solid fa-bars fs-3"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout} className="custom">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
