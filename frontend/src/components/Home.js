import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav,NavLink} from "react-bootstrap";
import { Container, Row, Col } from 'fluid-react';

import {DisplayMapClass} from './map/Map' // import the map here
class Home extends Component {
  render() {
    return (
      <Container fluid>
      <Navbar >
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto justify-content-end w-100">
          <NavLink as={Link} to="/login/">
            Login
          </NavLink>
          <Nav.Link as={Link} to="/signup/">Sign up</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row >
      <Col>        
        <h1>Home Page!</h1>
      </Col>
      <Col xs="12" md="4">
    <DisplayMapClass />
    </Col> 
  </Row>
        </Container>
    );
  }
}

export default Home;
