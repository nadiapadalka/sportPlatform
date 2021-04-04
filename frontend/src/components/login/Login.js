import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import { login } from "./LoginActions.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(userData, "/");
  };
  render() {
    return (
      <Container>
        <Row>
          <Col md="4">
            <h1>Увійти</h1>
            <Form>
              <Form.Group controlId="emailId">
                <Form.Label>Ваше ім'я</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Введіть email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group controlId="passwordId">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Введіть пароль"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </Form.Group>
            </Form>
            <Button size="lg" variant="secondary" onClick={this.onLoginClick}>
              Login
            </Button>
            <p className="mt-2">
              Досі не маєте аккаунту? <Link to="/signup">Зареєструватись</Link>
            </p>
            <p className="mt-2">
              Забули пароль?{" "}
              <Link to="/send_reset_password">Змінити пароль</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

//export default Login;
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(withRouter(Login));
