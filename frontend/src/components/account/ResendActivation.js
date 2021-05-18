import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Blur from 'react-blur';
import {
  Alert,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

class ResendActivation extends Component {
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

  onResendClick = () => {
    this.setState({ emailError: "" });
    this.setState({ status: "" });

    const userData = {
      email: this.state.email
    };

    axios
      .post("/api/v1/users/resend_activation/", userData)
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
        <Alert.Heading>Виникла проблема під час надсилання листа </Alert.Heading>
        Будь ласка, спробуйте знову.
      </Alert>
    );

    let successAlert = (
      <Alert variant="success">
        <Alert.Heading>Email надіслано </Alert.Heading>
        <p>
        Ми надіслали вам ласт з активним посиланням для зміни паролю. Будь ласка перевірте свій email.
        </p>
        <p>
        Будь ласка, спробуйте знову, якщо ви не отримаєте листа впродовж кількох хвилин.
        </p>
      </Alert>
    );

    let form = (
      <div>
        <Form>
          <Form.Group controlId="emailId">
            <Form.Label>
              Ваш аккаунт не є активований. Будь ласка, активуйте його.
            </Form.Label>
            <Form.Control
              isInvalid={this.state.emailError}
              type="text"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <FormControl.Feedback type="invalid">
              {this.state.emailError}
            </FormControl.Feedback>
          </Form.Group>
        </Form>
        <Button size="lg" variant="secondary" onClick={this.onResendClick}>
          Надіслати лист для активації аккаунту
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
      <Blur img="images/background.jpeg" blurRadius={7} enableStyles 
      style={{
            height: "100vh"          }}>
      <Container>
        <Row>
        <Col md={{ span: 6, offset: 3 }} style={{backgroundColor:"HoneyDew"}}>
            <h1>Надіслати лист для активації аккаунту знову</h1>
            {alert}
            {this.state.status !== "success" && form}
          </Col>
        </Row>
      </Container></Blur>
    );
  }
}

ResendActivation.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(ResendActivation));
