import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav,NavLink, Button} from "react-bootstrap";
import { Container, Row, Col } from 'fluid-react';
// import NotesList from "./notes/NotesList";
import { logout } from "./login/LoginActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {DisplayMapClass} from './map/Map' // import the map here
import EventList from "./events/EventList";
import ReactSearchBox from 'react-search-box'

class Home extends Component {
  onLogout = () => {
    this.props.logout();
  };
  render() {
    const { user } = this.props.auth;

    console.log(user.username)
    console.log(typeof(user.username) !== 'undefined' && user.username != null)
    const data = [
      {
        key: 'john',
        value: 'John Doe',
      },
      {
        key: 'jane',
        value: 'Jane Doe',
      },
      {
        key: 'mary',
        value: 'Mary Phillips',
      },
      {
        key: 'robert',
        value: 'Robert',
      },
      {
        key: 'karius',
        value: 'Karius',
      },
    ]
    return (
      <Container fluid>
      <Navbar >
      < Navbar.Collapse id="justify-content-end ">
					<Nav className="ml-auto justify-content-end w-100">
          <Button as={Link} to="/addEvent">Створити подію</Button>
          {/* check if user is already authentificated or not */}
          {typeof(user.username) !== 'undefined' && user.username != null
        ? <Nav>
        <Navbar.Text>
          Привіт, <b>{user.username}</b>
        </Navbar.Text>    
        
        <Nav.Link onClick={this.onLogout}>Вийти</Nav.Link>
        </Nav>
        : <NavLink as={Link} to="/login/">
        Увійти
      </NavLink>
      }
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row >
      <Col>
      <Container>
      <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
        data={this.data}
        callback={record => console.log(record)}
      />          <EventList />
        </Container>        
      </Col>
      <Col xs="12" md="5">
    <DisplayMapClass />
    </Col> 
  </Row>
        </Container>
    );
  }
}
Home.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  logout
})(withRouter(Home));