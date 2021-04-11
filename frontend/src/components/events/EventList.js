import  React, { Component } from  'react';
import PropTypes from "prop-types";
import  EventsService  from  './EventService';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import { Container, Row, Col } from 'fluid-react';

const  eventsService  =  new  EventsService();

class  EventList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        events: [],
        nextPageURL:  '',
        user: this.props.user
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    eventsService.getEvents().then(function (result) {
        console.log(result);
        self.setState({ events:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    eventsService.deleteEvent({pk :  pk}).then(()=>{
        var  newArr  =  self.state.events.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({events:  newArr})
    });
}
subscribeToEvent(e,pk,user){
    var  self  =  this;

eventsService.updateSubscribedUsers(
    {"pk":pk,
      "subscribedUsers": this.state.user
  }
  ).then((result)=>{
    alert("Users updated!");
  }).catch(()=>{
    alert('There was an error! Please re-check your form.');
  });
}
nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    eventsService.getEventsByURL(this.state.nextPageURL).then((result) => {
        self.setState({ events:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div>
            {this.state.events.map( c  =>
      <Card>
            <div>
                 Data from parent is:{this.state.user}
             </div>
          <Row >
          <Col><CardBody className="col">
          <CardTitle tag="h4">{c.title}</CardTitle>
          <CardSubtitle tag="h5" className="mb-2 text-muted">{c.city}</CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{c.address}</CardSubtitle>
          <CardText>{c.content}</CardText>
          <Button onClick={(e)=>  this.subscribeToEvent(e,c.pk,this.state.user) }>Підписатись на подію</Button>
          <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                 <a  href={"/event/" + c.pk}> Update</a>
        </CardBody></Col>
        <Col> 
             <CardImg  top width="40%" className="col-auto" src={c.image} alt="Card image cap" />
        </Col>
        
        </Row>

      </Card>)}
    </div>
        );
  }
}
EventList.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
export  default  EventList;