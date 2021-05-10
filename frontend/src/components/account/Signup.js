import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";
import { setAxiosAuthToken } from "../../utils/Utils";
import {
  Alert,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      usernameError: "",
      passwordError: "",
      emailError: "",
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSignupClick = () => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: "",
      status: ""
    });

    const userData = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };

    setAxiosAuthToken(""); // send request with empty token
    axios
      .post("/api/v1/users/", userData)
      .then(response => {
        console.log("user added")
        console.log(response)
        this.setState({ status: "success" });
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.hasOwnProperty("username")) {
            this.setState({ usernameError: error.response.data["username"] });
          }
          if (error.response.data.hasOwnProperty("email")) {
            this.setState({ emailError: error.response.data["email"] });
          }
          if (error.response.data.hasOwnProperty("password")) {
            this.setState({ passwordError: error.response.data["password"] });
          }
          if (error.response.data.hasOwnProperty("detail")) {
            this.setState({ status: "error" });
          }
        } else {
          this.setState({ status: "error" });
        }
      });
  };

  render() {
    let errorAlert = (
      <Alert variant="danger">
        <Alert.Heading>Виникла проблема під час створення аккаунту</Alert.Heading>
        Спробуйте ще раз або зконтактуйте з службою підтримки для допомоги.
      </Alert>
    );

    let successAlert = (
      <Alert variant="success">
        <Alert.Heading>Аккаунт створено!</Alert.Heading>
        <p>
          Ми надіслали вам ласт з активним посиланням. Будь ласка перевірте свій email.
        </p>
      </Alert>
    );

    const form = (
      <div>
        <Form>
          <Form.Group controlId="usernameId">
            <Form.Label>Ім'я користувача</Form.Label>
            <Form.Control
              isInvalid={this.state.usernameError}
              type="text"
              name="username"
              placeholder="Введіть ім'я користувача"
              value={this.state.username}
              onChange={this.onChange}
            />
            <FormControl.Feedback type="invalid">
              {this.state.usernameError}
            </FormControl.Feedback>
          </Form.Group>

          <Form.Group controlId="emailId">
            <Form.Label>Ваш Email</Form.Label>
            <Form.Control
              isInvalid={this.state.emailError}
              type="text"
              name="email"
              placeholder="Введіть email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <FormControl.Feedback type="invalid">
              {this.state.emailError}
            </FormControl.Feedback>
          </Form.Group>

          <Form.Group controlId="passwordId">
            <Form.Label>Ваш пароль</Form.Label>
            <Form.Control
              isInvalid={this.state.passwordError}
              type="password"
              name="password"
              placeholder="Введіть ваш пароль"
              value={this.password}
              onChange={this.onChange}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.passwordError}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <Button color="primary" onClick={this.onSignupClick}>
          Зареєструватись
        </Button>
      </div>
    );

    let alert = "";
    if (this.state.status === "error") {
      alert = errorAlert;
    } else if (this.state.status === "success") {
      alert = successAlert;
    }

    return (
      <Container>
        <Row>
          <Col md="6">
            <h1>Зареєструватись</h1>
            {alert}
            {this.state.status !== "success" && form}
            <p className="mt-2">
              Уже маєте аккаунт? <Link to="/login">Вхід</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

Signup.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(Signup));
