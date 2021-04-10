import  React, { Component } from  'react';
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
        nextPageURL:  ''
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

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    eventsService.getEventsByURL(this.state.nextPageURL).then((result) => {
        self.setState({ events:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        //  <div  className="events--list">
        //     <table  className="table">
        //     <thead  key="thead">
        //     <tr>
        //     <th>#</th>

        //         <th>Title</th>
        //         <th>Content</th>
        //         <th>City</th>
        //         <th>Address</th>
        //         <th>Image</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     {this.state.events.map( c  =>
        //         <tr  >
        //         <td>{c.pk}  </td>

        //         <td>{c.title}</td>
        //         <td>{c.content}</td>
        //         <td>{c.city}</td>
        //         <td>{c.address}</td>
        //         <td>{c.image}</td>
        //         <td>
        //         <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
        //         <a  href={"/event/" + c.pk}> Update</a>
        //         </td>
        //     </tr>)}
        //     </tbody>
        //     </table>
        //     <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        // </div>
        <div>
            {this.state.events.map( c  =>
      <Card>
          <Row >
          <Col><CardBody className="col">
          <CardTitle tag="h4">{c.title}</CardTitle>
          <CardSubtitle tag="h5" className="mb-2 text-muted">{c.city}</CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{c.address}</CardSubtitle>
          <CardText>{c.content}</CardText>
          <Button>Підписатись на подію</Button>
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
export  default  EventList;