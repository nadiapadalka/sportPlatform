import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
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

class ResetPasswordConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_password: "",
      passwordError: "",
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSaveClick = () => {
    this.setState({ passwordError: "" });
    this.setState({ status: "" });

    const { uid, token } = this.props.match.params;
    const data = {
      uid: uid,
      token: token,
      new_password: this.state.new_password
    };
    axios
      .post("/api/v1/users/reset_password_confirm/", data)
      .then(response => {
        this.setState({ status: "success" });
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data.hasOwnProperty("new_password")
        ) {
          this.setState({ passwordError: error.response.data["new_password"] });
        } else {
          this.setState({ status: "error" });
        }
      });
  };

  render() {
    const errorAlert = (
      <Alert variant="danger">
        <Alert.Heading>Виникла проблема під час створення нового пароля.</Alert.Heading>
        <p>
          Будь ласка, спробуйте <Link to="/send_reset_password">змінити пароль</Link> знову.
        </p>
      </Alert>
    );

    const successAlert = (
      <Alert variant="success">
        <Alert.Heading>Створення нового пароля</Alert.Heading>
        <p>
          Ви можете  <Link to="/login/">увійти</Link> у свій аккаунт використовуючи новий пароль.        </p>
      </Alert>
    );

    const form = (
      <div>
        <Form>
          <Form.Group controlId="emailId">
            <Form.Label>Ваш новий пароль</Form.Label>
            <Form.Control
              isInvalid={this.state.passwordError}
              type="password"
              name="new_password"
              placeholder="Введіть новий пароль"
              value={this.state.new_password}
              onChange={this.onChange}
            />
            <FormControl.Feedback type="invalid">
              {this.state.passwordError}
            </FormControl.Feedback>
          </Form.Group>
        </Form>
        <Button size="lg" variant="secondary" onClick={this.onSaveClick}>
          Зберегти
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
            <h1>Створити новий пароль </h1>
            {alert}
            {this.state.status !== "success" && form}
          </Col>
        </Row>
      </Container>
    );
  }
}

ResetPasswordConfirm.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(ResetPasswordConfirm));
