import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav,NavLink, Button} from "react-bootstrap";
import { Container, Row, Col } from 'fluid-react';
import { logout } from "./login/LoginActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Map from "./events/Map"; // import the map here
import EventList from "./events/EventList";
import SubscribedEvents from "./events/SubscribedEvents";

class Home extends Component {
  onLogout = () => {
    this.props.logout();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <Container>
      <Navbar >
      < Navbar.Collapse id="justify-content-end ">
					<Nav className="ml-auto justify-content-end w-100">
          <Button as={Link} to={     
                  {pathname: '/addEvent',
                  state:user.username
        }}>Створити подію</Button>
          <Nav.Link as={Link} to={
            {     
         pathname: '/SubscribedEvents',
         state:user.username
        }} >Мої події</Nav.Link>
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
      <Container>
          <EventList user = {user.username}/>
        </Container>        
  </Row>
        </Container>
    );
  }
}
Home.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object
};


const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  logout
})(withRouter(Home));