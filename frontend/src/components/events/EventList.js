import  React, { Component ,useState} from  'react';
import PropTypes from "prop-types";
import  EventsService  from  './EventService';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import TextField from '@material-ui/core/TextField';
import SearchField from "react-search-field";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Label
  } from 'reactstrap';
  import { Container, Row, Col } from 'fluid-react';
import { PersonCheckFill, ThermometerSnow } from 'react-bootstrap-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const  eventsService  =  new  EventsService();

class  EventList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        events: [],
        nextPageURL:  '',
        user: this.props.user,
        subscribedEventsId:[],
        clickedEventId: {},
        availablePlaces: 0
    };

    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);

}
componentDidMount() {
    var  self  =  this;
    eventsService.getEvents().then(function (result) {
        self.setState({ events:  result.data, nextPageURL:  result.nextlink})
        self.state.events.map( c  =>{
          var subscribedUsers;
          if (c.subscribedUsers === null) 
              subscribedUsers = {};
          else { 
              //parsing subscribedUsers from db
              subscribedUsers = JSON.parse(c.subscribedUsers);
              console.log(subscribedUsers)
              //getting only users
              var vals = Object.keys(subscribedUsers).map(function(key) {
                return subscribedUsers[key];});
              console.log(vals)
            
               var n = vals.includes(self.state.user);
                console.log("n ",n)
              if(n)
              {
              var a = [];
              //setting subscribedEventsId field with ids of events
              //localStorage.setItem('subscribedEventsId', JSON.stringify(a));
              a = JSON.parse(localStorage.getItem('subscribedEventsId')) || [];
              a = Array.from(a)
              if (!a.includes(c.pk)) {a.push(c.pk);}
              if (localStorage.getItem('subscribedEventsId') === null || !localStorage.getItem('subscribedEventsId').includes(c.pk)){

                localStorage.setItem('subscribedEventsId', JSON.stringify(a));
              }
          }
        }
      })
     });
     console.log("subscribedEventsId", localStorage.getItem('subscribedEventsId'))

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
subscribeToEvent(e,pk,user,subscribedUsers, capacity){
  var  self  =  this;
  var key = "username" + pk.toString()
  if (subscribedUsers === null) 
    subscribedUsers = {};
  else{
    subscribedUsers = JSON.parse(subscribedUsers);
    var vals = Object.keys(subscribedUsers).map(function(key) {
      return subscribedUsers[key];
    });
    var n = vals.includes(this.state.user);
  }
  console.log(Object.keys(subscribedUsers.length == 0))
 if (!n && !localStorage.getItem('subscribedEventsId').includes(pk)) {
    subscribedUsers[key]=user
    var a = [];
    a = JSON.parse(localStorage.getItem('subscribedEventsId')) || [];
    a = Array.from(a)
    if (!a.includes(pk)) {a.push(pk);}
    localStorage.setItem('subscribedEventsId', JSON.stringify(a));
    var availablePlaces;
    if (capacity >= 1) availablePlaces = capacity -1;
  }
    eventsService.updateSubscribedUsers(
    {"pk":pk,
    "subscribedUsers": JSON.stringify(subscribedUsers),
    "availablePlaces": availablePlaces
  }
  ).then((result)=>{
    toast.success("Ви підписались на подію.");
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
    
    <Row >
    <Col>
    
    <Container>
    <div>
    
             {this.state.events.map( c  =>
        <Card>
          <Row >
          <Col>
            <CardBody key={c.pk} className="col">
            <CardTitle tag="h4">{c.title}</CardTitle>
            <CardSubtitle tag="h5" className = "mb-2 text-muted">{c.city}</CardSubtitle>
            <CardSubtitle tag="h6" className = "mb-2 text-muted">{c.address}</CardSubtitle>
            <CardText>{c.content}</CardText>
            <CardText>Кількість місць: {c.capacity}</CardText>
            {c.availablePlaces !== 0
            ?<CardText>Кількість вільних місць: {c.availablePlaces}</CardText>
            :<CardText>Немає вільних місць!</CardText>}

            {c.creator === this.state.user
            ?<Label >Ви створили цю подію!<br/></Label>
            :localStorage.getItem('subscribedEventsId') !== null && localStorage.getItem('subscribedEventsId').includes(c.pk)
            ?<Label >Ви уже підписались на цю подію!<br/></Label>
            :<Button onClick={(e)=>this.subscribeToEvent(e, c.pk, this.state.user, c.subscribedUsers, c.capacity) }>Підписатись на подію</Button>}
            
          <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Видалити</button>
                 <a  href={"/event/" + c.pk}> Оновити інформацію</a>
                 <a  href={"/detailEvent/" + c.pk}> Деталі події</a>
        </CardBody></Col>
        <Col> 
             <CardImg  top width="40%" className="col-auto" src={c.image}/>
        </Col>
        
        </Row>

      </Card>
      )}
    </div>     
    </Container>        
    </Col>
    <Col xs="12" md="5">
    <MapContainer center={[49.83096655, 24.039360473819094]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {this.state.events.map( (marker,idx)  =>
          {
            let position = [marker.longitude, marker.latitude];
            return (
              <Marker key={idx}
              eventHandlers={{
                click: (e) => {
                  console.log('marker clicked', marker.pk)
                  let path = "/detailEvent/" + marker.pk; 
                  this.props.history.push(path);
                  //this.focusCard(e, marker.pk)
                },
              }}
                position={position}>
                  <a  href={"/detailEvent/" + marker.pk}/>
                <Popup>{marker.address}</Popup>
              </Marker>
            );
        }
          )}
    </MapContainer>
  </Col> 
</Row>);
  }
}
const mapStateToProps = state => ({});

EventList.propTypes = {
    logout: PropTypes.func.isRequired,
  };
  export default connect(mapStateToProps)(withRouter(EventList));