import React, { Component,Image } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Row, Col } from 'fluid-react';
import axios from 'axios';
import  EventsService  from  './EventService';
const  eventsService  =  new  EventsService();

class AddEvent extends Component {
  state = {
    title: '',
    content: '',
    city: '',
    address: '',
    image: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    form_data.append('city', this.state.city);
    form_data.append('address', this.state.address);


    let url = 'http://localhost:8000/api/events/';
    axios.post(url, form_data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    })
        .then(res => {
          alert("Customer created!");
          console.log(res.data);
          this.props.history.push("/");
        })
        .catch(err => console.log(err))
  };

  
  handleUpdate(pk){
    eventsService.updateCustomer(
      {
        "pk": pk,
        "title": this.refs.title.value,
        "content": this.refs.lastName.value,
        "city": this.refs.email.value,
        "phone": this.refs.phone.value,
        "address": this.refs.address.value,
        "image": this.refs.description.value
    }
    ).then((result)=>{
      console.log(result);
      alert("Customer updated!");
    }).catch(()=>{
      alert('There was an error! Please re-check your form.');
    });
  }
  handleSubmit(event) {
    const { match: { params } } = this.props;

    if(params && params.pk){
      this.handleUpdate(params.pk);
    }
    else
    {
      this.handleCreate();
    }

    event.preventDefault();
  }


  render() {
    return (
      <div>
        <Form>
          <Form.Group >
          <Row >
      <Col>
          <Form.Label>Подія</Form.Label>
          <Form.Control
              type="text"
              rows={3}
              id="title"
              placeholder="Введіть назву події"
              value={this.state.title}
              onChange={this.handleChange} required
            />
            <Form.Label>Опис</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="content"
              placeholder="Введіть опис події"
              value={this.state.content}
              onChange={this.handleChange} required
            />
            <Form.Label>Адреса</Form.Label>
            <Form.Control
              type ="text"
              rows={3}
              id="city"
              placeholder="Введіть місто"
              value={this.state.city}
              onChange={this.handleChange} required            />
            <Form.Control
              as="textarea"
              rows={3}
              id="address"
              placeholder="Введіть адресу"
              value={this.state.address}
              onChange={this.handleChange} required
            />
            </Col>
            <Col>
            <img src="images/img.jpg" alt="BigCo Inc. logo" style={{ height: "85%", width: "60%"}}/>
           

            <Form.File 
              id="image"
              accept="image/png, image/jpeg"  
              onChange={this.handleImageChange} required 
              label="Дойте світлину події" />
                       </Col>
            </Row>
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.handleSubmit}>
          Створити подію
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(AddEvent));