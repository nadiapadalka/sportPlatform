import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Alert, Container, Row, Col } from "react-bootstrap";
import Blur from 'react-blur';

class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const { uid, token } = this.props.match.params;
    console.log("activate account")
    console.log(token)
    axios
      .post("/api/v1/users/activation/", { uid, token })
      .then(response => {
        console.log(response)
        this.setState({ status: "success" });
      })
      .catch(error => {
        console.log(error)
        this.setState({ status: "error" });
      });
  }

  render() {
    let errorAlert = (
      <Alert variant="danger">
        <Alert.Heading>Виникла проблема при активації аккаунту.</Alert.Heading>
        Будь ласка, спробуйте знову.
      </Alert>
    );

    let successAlert = (
      <Alert variant="success">
        <Alert.Heading>Вітаємо, ваш аккаунт активовано!</Alert.Heading>
        <p>
          Тепер ви можете <Link to="/login/">Ввійти</Link> у свій аккаунт.
        </p>
      </Alert>
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
            <h1>Активація аккаунту</h1>
            {alert}
          </Col>
        </Row>
      </Container></Blur>
    );
  }
}

ActivateAccount.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(ActivateAccount));
