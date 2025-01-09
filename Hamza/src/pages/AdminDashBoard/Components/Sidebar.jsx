import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./Sidebar.css";
function Sidebar() {
  return (
    <Container className="bg-white p-2 h-100 Box-Sh custom-container">
      <Row>
        <Col>
          <i className="bi bi-bootstrap-fill my-2"></i>
          <span className="fs-4 brand-name">Admin</span>
        </Col>
      </Row>

      <hr className="text-dark" />

      <ListGroup variant="flush">
        <ListGroup.Item action as={Link} to="create-donation" className="py-2">
          <i className="bi bi-people fs-5 me-2"></i>
          <span>Donation</span>
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="category" className="py-2">
          <i className="bi bi-house fs-5 me-2"></i>
          <span>Category</span>
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="cause" className="py-2">
          <i className="bi bi-house fs-5 me-2"></i>
          <span>Cause</span>
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="create-promotion" className="py-2">
          <i className="bi bi-house fs-5 me-2"></i>
          <span>Promotions</span>
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="create-business" className="py-2">
          <i className="bi bi-people fs-5 me-2"></i>
          <span>Business</span>
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="create-alignment" className="py-2">
          <i className="bi bi-people fs-5 me-2"></i>
          <span>Alignment</span>
        </ListGroup.Item>

        <ListGroup.Item action as={Link} to="contact" className="py-2">
          <i className="bi bi-people fs-5 me-2"></i>
          <span>Contact</span>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default Sidebar;
