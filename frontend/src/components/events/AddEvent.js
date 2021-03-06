import React, { Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Row, Col,Container, Grid } from 'fluid-react';
import  EventsService  from  './EventService';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Blur from 'react-blur';

const provider = new OpenStreetMapProvider();
const  eventsService  =  new  EventsService();

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("init");

  }
  state = {
    title: '',
    content: '',
    city: '',
    category:'',
    address: '',
    number:0,
    image: "images/img.jpg",
    latitude: 0,
    file: "images/img.jpg",
    addressChanged: '',
    date:'',
    user: this.props.location.state,
    longitude: 0  };

  componentDidMount(){
    console.log("componentDidMount")
    const { match: { params } } = this.props;
        if(params && params.pk)
        {

          eventsService.getEvent(params.pk).then((c)=>{
            this.refs.title.value = c.title;
            this.refs.content.value = c.content;
            this.refs.city.value = c.city;
            this.refs.address.value = c.address;
            this.refs.image.name = c.image;
            if (c.image !== null) this.state.file = c.image
            console.log(this.refs.image)

        })
  //                   // searching for coordinates by an adress
  //           provider.search({ query: c.address}).then((result)=>{
  //             this.state.longitude = result[0].y
  //             this.state.latitude = result[0].x});
  // }
}}
  handleChange = (e) => {
    console.log("handleChange")
    console.log(e.target)
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
      file: URL.createObjectURL(e.target.files[0])

    })
        if (this.state.address !== '') 
      {
      provider.search({ query: this.state.address}).then((result)=>{
      this.state.longitude = result[0].y
      this.state.latitude = result[0].x}
      );}
  };

  handleCreate() {
    let form_data = new FormData();
    console.log(this.state.category)
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('creator',this.state.user);
    form_data.append('longitude', this.state.longitude);
    form_data.append('latitude', this.state.latitude);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    form_data.append('city', this.state.city);
    form_data.append('creator',this.state.user);
    form_data.append('address', this.state.address);
    form_data.append('category', this.state.category);

    //form_data.append('date', this.state.date);



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
      console.result("Event was updated!")
      this.props.history.push("/");
    }).catch(()=>{
      alert('?????????????? ??????????????. ???????? ?????????? ?????????????????? ?????????? ?? ?????????????????? ???? ??????.');
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
        if(params && params.pk)
        {          
          eventsService.getEvent(params.pk).then((c)=>{
            this.state.file= c.image;          
            })
          }
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
          <Form.Label>??????????</Form.Label>
          <Form.Control
              type="text"
              rows={3}
              id="title"
              ref="title"
              placeholder="?????????????? ?????????? ??????????"
              value={this.state.title}
              onChange={this.handleChange} required
            />
            <Form.Label>????????</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="content"
              ref ="content"
              placeholder="?????????????? ???????? ??????????"
              value={this.state.content}
              onChange={this.handleChange} required
            />
            <Form.Label>????????????</Form.Label>
            <Form.Control
              type ="text"
              rows={3}
              id="city"
              ref = "city"
              placeholder="?????????????? ??????????"
              value={this.state.city}
              onChange={this.handleChange} required            />
              <br/>
            <Form.Control
              as="textarea"
              rows={3}
              id="address"
              ref ="address"
              placeholder="?????????????? ????????????"
              value={this.state.address}
              onChange={this.handleChange} required
            />
            <Form.Label>?????????????????? ??????????</Form.Label>
            <Form.Control
              type="text"
              rows={3}
              id="number"
              ref ="number"
              placeholder="?????????????? ?????????????????? ??????????"
              value={this.state.number}
              onChange={this.handleChange} required
            />
            <Form.Control as="select"
            id="category"
            ref = "category"
            componentClass="select"
            onChange={this.handleChange} required   
            >
              <option>????????/????????????????</option>
              <option>???????????????? ????????</option>
              <option>???????????????????? ???? ????????????</option>
              <option>????????????????????</option>
            </Form.Control>
            <Form.Label>???????? ??????????</Form.Label>
            <Form.Control
              type ="date"
              format="YYYY-MM-DD"
              rows={3}
              id="date"
              ref = "date"
              placeholder="?????????????? ???????? ??????????"
              value={this.state.date}
              onChange={this.handleChange} required            />
            </Col>
            <Col  style={{ padding: '15px'}}>
            <img src={this.state.file} style={{ height: "85%", width: "80%"}}/>
           

            <Form.File 
              id="image"
              accept="image/png, image/jpeg"  
              onChange={this.handleImageChange} required 
              ref ="image"
              label="?????????????? ???????????????? ??????????" />
                       </Col>
            </Row>
          </Form.Group>
        </Form>
        {(params && params.pk)
        ?<Button variant="success" onClick={this.handleSubmit}>
          ?????????????? ??????????
        </Button>
        :<Button variant="success" onClick={this.handleSubmit}>
          ???????????????? ??????????
        </Button>}
        </Col>
        </Row>
        </Container></Blur>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(AddEvent));