import React, { Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Row, Col } from 'fluid-react';
import  EventsService  from  './EventService';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
const provider = new OpenStreetMapProvider();
const  eventsService  =  new  EventsService();

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    title: '',
    content: '',
    city: '',
    address: '',
    image: null,
    latitude: '',
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
            this.refs.image = c.image;
            // searching for coordinates by an adress
            provider.search({ query: c.address}).then((result)=>{
              this.state.longitude = result[0].y
              this.state.latitude = result[0].x});
        })
  }
}
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

  handleCreate() {
    console.log("handle create");
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    form_data.append('city', this.state.city);
    form_data.append('address', this.state.address);


    let url = 'http://localhost:8000/api/events/';
    eventsService.createEvent(form_data)
        .then(res => {
          console.log(res.data);
          this.props.history.push("/");
        })
        .catch(err => console.log(err))
  };

  
  handleUpdate(pk){
    eventsService.updateEvent(
      {
        "pk": pk,
        "title": this.refs.title.value,
        "content": this.refs.content.value,
        "city": this.refs.city.value,
        "address": this.refs.address.value,
        "latitude": this.state.latitude,
        "longitude": this.state.longitude
    }
    ).then((result)=>{
      alert("Event updated!");
      this.props.history.push("/");
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
    const { match: { params } } = this.props;
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
              ref="title"
              placeholder="Введіть назву події"
              value={this.state.title}
              onChange={this.handleChange} required
            />
            <Form.Label>Опис</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="content"
              ref ="content"
              placeholder="Введіть опис події"
              value={this.state.content}
              onChange={this.handleChange} required
            />
            <Form.Label>Адреса</Form.Label>
            <Form.Control
              type ="text"
              rows={3}
              id="city"
              ref = "city"
              placeholder="Введіть місто"
              value={this.state.city}
              onChange={this.handleChange} required            />
            <Form.Control
              as="textarea"
              rows={3}
              id="address"
              ref ="address"
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
              ref ="image"
              label="Дойте світлину події" />
                       </Col>
            </Row>
          </Form.Group>
        </Form>
        {(params && params.pk)
        ?<Button variant="success" onClick={this.handleSubmit}>
          Оновити подію
        </Button>
        :<Button variant="success" onClick={this.handleSubmit}>
          Створити подію
        </Button>}
        </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(AddEvent));