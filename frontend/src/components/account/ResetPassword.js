import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
  Alert,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSendClick = () => {
    this.setState({ emailError: "" });
    this.setState({ status: "" });

    const userData = {
      email: this.state.email
    };
    axios
      .post("/api/v1/users/reset_password/", userData)
      .then(response => {
        this.setState({ status: "success" });
      })
      .catch(error => {
        if (error.response && error.response.data.hasOwnProperty("email")) {
          this.setState({ emailError: error.response.data["email"] });
        } else {
          this.setState({ status: "error" });
        }
      });
  };
  render() {
    let errorAlert = (
      <Alert variant="danger">
        <Alert.Heading>Виникла проблема під час надсилання листа</Alert.Heading>
        Будь ласка, спробуйте знову.
      </Alert>
    );

    let successAlert = (
      <Alert variant="success">
        <Alert.Heading>Email надіслано. </Alert.Heading>
        <p>
        Ми надіслали вам ласт з активним посиланням для зміни паролю. Будь ласка перевірте свій email.
        </p>
        <p>
          Будь ласка, спробуйте знову або напишіть нам, якщо виникли проблеми з отриманням листа.
        </p>
      </Alert>
    );

    let form = (
      <div>
        <Form>
          <Form.Group controlId="emailId">
            <Form.Label>Ваш email</Form.Label>
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
        </Form>
        <Button size="lg" variant="secondary" onClick={this.onSendClick}>
          Надіслати email з посиланням для зміни паролю
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
            <h1>Змінити пароль</h1>
            {alert}
            {this.state.status !== "success" && form}
          </Col>
        </Row>
      </Container>
    );
  }
}

ResetPassword.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(ResetPassword));
