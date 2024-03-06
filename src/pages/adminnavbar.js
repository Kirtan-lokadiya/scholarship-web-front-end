import React from "react";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

const AdminNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="adminNavbar" />
      <Navbar.Collapse id="adminNavbar">
        <Nav className="me-auto">
          <Nav.Link href="#" className="active">Dashboard</Nav.Link>
          {/* <Nav.Link href="#">Users</Nav.Link> */}
          <NavDropdown title="Manage" id="adminDropdown">
            <NavDropdown.Item href="">Update Your scholarship</NavDropdown.Item>
            <NavDropdown.Item href="#">Delete Your scholarship</NavDropdown.Item>
          
          </NavDropdown>
        </Nav>
     
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
