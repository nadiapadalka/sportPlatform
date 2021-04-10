import React, { Component } from 'react';
import EventsService from './EventsService';

const eventsService = new EventsService();

class EventCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          eventsService.getEvent(params.pk).then((c)=>{
            this.refs.firstName.value = c.first_name;
            this.refs.lastName.value = c.last_name;
            this.refs.email.value = c.email;
            this.refs.phone.value = c.phone;
            this.refs.address.value = c.address;
            this.refs.description.value = c.description;
          })
        }
      }

      handleCreate(){
        eventsService.createEvent(
          {
            "title": this.refs.title.value,
            "content": this.refs.lastName.value,
            "city": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "image": this.refs.description.value
        }
        ).then((result)=>{
          alert("Event created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        eventsService.updateEvent(
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
          alert("Event updated!");
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
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              First Name:</label>
              <input className="form-control" type="text" ref='firstName' />

            <label>
              Last Name:</label>
              <input className="form-control" type="text" ref='lastName'/>

            <label>
              Phone:</label>
              <input className="form-control" type="text" ref='phone' />

            <label>
              Email:</label>
              <input className="form-control" type="text" ref='email' />

            <label>
              Address:</label>
              <input className="form-control" type="text" ref='address' />

            <label>
              Description:</label>
              <textarea className="form-control" ref='description' ></textarea>


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default EventCreateUpdate;