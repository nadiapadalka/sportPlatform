import React, { Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Row, Col,Container } from 'fluid-react';
import  EventsService  from  './EventService';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Blur from 'react-blur';

const  eventsService  =  new  EventsService();

class EventDetails extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    image: '',
    user: this.props.location.state,
    longitude: 0  };
  

  componentDidMount(){
    const { match: { params } } = this.props;
        if(params && params.pk)
        {

          eventsService.getEvent(params.pk).then((c)=>{
            
            this.refs.title.value = c.title;
            this.refs.content.value = c.content;
            this.refs.city.value = c.city;
            this.refs.address.value = c.address;
            this.refs.capacity.value = c.capacity;
            this.refs.availablePlaces.value = c.availablePlaces;
            this.refs.date = c.date;
            // this.refs.image.name = c.image;
            // console.log(this.refs.image);}
          })
  }
  }
// handleImageChange = (e) => {
//   this.setState({
//     image: e.target.files[0],
//     file: URL.createObjectURL(e.target.files[0])

//   })
// };


  render() {
    const { match: { params } } = this.props;
        if(params && params.pk)
        {          
          eventsService.getEvent(params.pk).then((c)=>{
            this.setState({
              image: c.image          
            })
          })}

    return (
<Blur img="images/background.jpeg" blurRadius={7} enableStyles 
      style={{
            height: "100vh"          }}>
      <Container style={{justifyContent: "center"}}>
        <Row>
        <Col  style={{backgroundColor:"HoneyDew", padding: '15px', justifyContent: "center",}}>

        <Form>
          <Form.Group >
          <Row >
          <Col>
          <Form.Label>Подія</Form.Label>
          <Form.Control
              type="text"
              rows={3}
              id="title"
              ref="title"
              placeholder="Введіть назву події"
              value={this.state.title} readOnly
            />
            <Form.Label>Опис</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="content"
              ref ="content"
              placeholder="Введіть опис події"
              value={this.state.content} readOnly
            />
            <Form.Label>Адреса</Form.Label>
            <Form.Control
              type ="text"
              rows={3}
              id="city"
              ref = "city"
              placeholder="Введіть місто"
              value={this.state.city}
              onChange={this.handleChange} required  readOnly          />
              <br/>
            <Form.Control
              as="textarea"
              rows={3}
              id="address"
              ref ="address"
              placeholder="Введіть адресу"
              value={this.state.address} readOnly
            />
            <Form.Label>Кількість місць</Form.Label>
            <Form.Control
              type ="text"
              rows={3}
              id="capacity"
              ref = "capacity"
              value={this.state.capacity}
              readOnly          />
              <br/>
            <Form.Label>Кількість вільних місць</Form.Label>
            <Form.Control
              type ="text"
              rows={3}
              id="availablePlaces"
              ref = "availablePlaces"
              value={this.state.availablePlaces}
              readOnly          />
            <Form.Label>Дата події</Form.Label>
            <Form.Control
              type ="date"
              rows={3}
              id="date"
              ref = "date"
              value={this.state.date}
              readOnly          />
            </Col>
            <Col  style={{ padding: '15px'}}>
            <img src={this.state.image} style={{ height: "85%", width: "80%"}}/>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        
        </Col>
        </Row>
        </Container></Blur>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(EventDetails));