import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/hon_logo_1.png";

class NavbarComp extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img src={logo} className="logo-image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              ALL
            </Nav.Link>
            <Nav.Link as={Link} to="/product">
              DESKS
            </Nav.Link>
            <Nav.Link as={Link} to="/product">
              CHAIRS
            </Nav.Link>
            <Nav.Link as={Link} to="/product">
              STORAGE & ACCESSORIES
            </Nav.Link>
            <Nav.Link as={Link} to="/product">
              BUNDLES
            </Nav.Link>
            <Nav.Link as={Link} to="/product">
              SHOP BY SPACE
            </Nav.Link>
            <Nav.Link as={Link} to="/product">
              DESIGN YOUR HOME OFFICE
            </Nav.Link>
          </Nav>
          <Form className="d-flex ">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarComp;
