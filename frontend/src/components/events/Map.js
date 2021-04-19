import React, { Component } from "react";
import  EventsService  from  "./EventService";
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
const marker = { lat: 24.4539, lng: 54.3773 };
const  eventsService  =  new  EventsService();

class  Map  extends  Component {
  constructor(props) {
    super(props);
    this.state  = {
        events: []        
    };}
    componentDidMount() {
      var  self  =  this;
      eventsService.getEvents().then(function (result) {
          self.setState({ events: result.data})
        });}
  
  render(){

  return (
    <MapContainer center={[49.54958975, 25.569396300266025]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {this.state.events.map( (marker,idx)  =>
          {
            let position = [marker.longitude, marker.latitude];
            console.log(position)
            console.log(idx)
            return (
              <Marker key={idx}
                      position={position}
              ></Marker>
            );
        }
          )}
    </MapContainer>
  );}
        }
export default Map;