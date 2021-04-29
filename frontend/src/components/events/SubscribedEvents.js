import  React, { Component } from  'react';
import PropTypes from "prop-types";
import  EventsService  from  './EventService';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Label
  } from 'reactstrap';
  import { Container, Row, Col } from 'fluid-react';

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
      <Card>
            {this.state.user === c.subscribedUsers &&

          <Row >
          <Col>
            <CardBody key={c.pk} className="col">
            <CardTitle tag="h4">{c.title}</CardTitle>
            <CardSubtitle tag="h5" className="mb-2 text-muted">{c.city}</CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">{c.address}</CardSubtitle>
            <CardText>{c.content}</CardText>
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