import  React, { Component } from  'react';
import PropTypes from "prop-types";
import  EventsService  from  './EventService';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Label
  } from 'reactstrap';
  import { Container, Row, Col } from 'fluid-react';
import { PersonCheckFill } from 'react-bootstrap-icons';

const  eventsService  =  new  EventsService();

class  EventList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        events: [],
        nextPageURL:  '',
        user: this.props.user,
        subscribedEventsId:[]
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
    console.log("subscribedEventsId", localStorage.getItem('subscribedEventsId'))

}
componentDidMount() {
    var  self  =  this;
    eventsService.getEvents().then(function (result) {
        console.log(result);
        // var subscribedEventsId = []
        // result.data.map(c=> 
        //   {
        //     subscribedEventsId.push(c.pk)
        //   })
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
subscribeToEvent(e,pk,user,subscribedUsers){
  var  self  =  this;
  
  var key = "username" + pk.toString()

  if (subscribedUsers === null) 
    subscribedUsers = {};
  else{
    console.log(subscribedUsers)
    subscribedUsers = JSON.parse(subscribedUsers);
  var vals = Object.keys(subscribedUsers).map(function(key) {
    return subscribedUsers[key];
  });
  var n = vals.includes(this.state.user);
  }
  console.log(Object.keys(subscribedUsers.length == 0))
 if (Object.keys(subscribedUsers.length == 0) || !n) {
    subscribedUsers[key]=user
    var a = [];
    a = JSON.parse(localStorage.getItem('subscribedEventsId')) || [];
    a = Array.from(a)
    a.push(pk);
    localStorage.setItem('subscribedEventsId', JSON.stringify(a));
  }
    eventsService.updateSubscribedUsers(
    {"pk":pk,
    "subscribedUsers": JSON.stringify(subscribedUsers)
  }
  ).then((result)=>{
    window.location.reload(); 
  }).catch(()=>{
    alert('Виникла помилка. Будь ласка перевірте введену інформацію і спробуйте ще раз');
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
          <Row >
          <Col>
            <CardBody key={c.pk} className="col">
            <CardTitle tag="h4">{c.title}</CardTitle>
            <CardSubtitle tag="h5" className="mb-2 text-muted">{c.city}</CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">{c.address}</CardSubtitle>
            <CardText>{c.content}</CardText>
            <CardText>{c.pk in this.state.subscribedEventsId}</CardText>
          { localStorage.getItem('subscribedEventsId').includes(c.pk)
        ? <Label >Ви уже підписались на цю подію!<br/></Label>
        :  <Button onClick={(e)=>  this.subscribeToEvent(e,c.pk,this.state.user, c.subscribedUsers) }>Підписатись на подію</Button>}

        <Label>{c.address}</Label>

          <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Видалити</button>
                 <a  href={"/event/" + c.pk}> Оновити інформацію</a>
        </CardBody></Col>
        <Col> 
             <CardImg  top width="40%" className="col-auto" src={c.image}/>
        </Col>
        
        </Row>

      </Card>
      )}
    </div>
        );
  }
}
EventList.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
export  default  EventList;