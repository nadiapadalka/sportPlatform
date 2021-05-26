import  React, { Component } from  'react';
import PropTypes from "prop-types";
import  EventsService  from  './EventService';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Label
  } from 'reactstrap';
  import { Container, Row, Col } from 'fluid-react';
  import {Badge, Button} from 'react-bootstrap';

const  eventsService  =  new  EventsService();

class  SubscribedEvents  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        events: [],
        nextPageURL:  '',
        user: this.props.location.state
    };
    this.nextPage  =  this.nextPage.bind(this);
}

componentDidMount() {
    var  self  =  this;
    eventsService.getEvents().then(function (result) {
        self.setState({ events:  result.data, nextPageURL:  result.nextlink})
    });
    this.state.events.map( c  =>{
    var subscribedUsers;
    if (c.subscribedUsers === null) 
        subscribedUsers = {};
    else{
        console.log(c.subscribedUsers)
        subscribedUsers = JSON.parse(c.subscribedUsers);
        var vals = Object.keys(c.subscribedUsers).map(function(key) {
    return subscribedUsers[key];});

    var n = vals.includes(this.state.user);
    if(Object.keys(subscribedUsers.length != 0) || n)
    {
    localStorage.setItem('subscribedEventsId', n);
    }
  }
})
}



nextPage(){
    var  self  =  this;
    eventsService.getEventsByURL(this.state.nextPageURL).then((result) => {
        self.setState({ events:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div>
            {this.state.events.map( c  =>
      <Card border="primary">
            {(localStorage.getItem('subscribedEventsId').includes(c.pk)) && (c.creator !== this.state.user )&&

          <Row >
          <Col>
            <CardBody key={c.pk} className="col">
            <CardTitle tag="h4">{c.title}</CardTitle>
            <CardSubtitle tag="h5" className = "mb-2 text-muted">{c.city}</CardSubtitle>
            <CardSubtitle tag="h6" className = "mb-2 text-muted">{c.address}</CardSubtitle>
            <CardText>{c.content}</CardText>
            <CardText tag="h6">Категорія: <Badge variant="info">{c.category}</Badge></CardText>
            <CardText>Кількість місць: {c.capacity}</CardText>
            {c.availablePlaces !== 0
            ?<CardText>Кількість вільних місць: {c.availablePlaces}</CardText>
            :<CardText>Немає вільних місць!</CardText>}
        </CardBody></Col>
        <Col> 
             <CardImg  top width="40%" className="col-auto" src={c.image}/>
        </Col>
        
        </Row>}

      </Card>
      )}
    </div>
        );
  }
}
SubscribedEvents.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
export  default  SubscribedEvents;