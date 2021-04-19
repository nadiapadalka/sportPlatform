import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class EventsService{

    constructor(){}


    getEvents() {
        const url = 'http://localhost:8000/api/events/';
        return axios.get(url).then(response => response.data);
    }
    getEventsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getEvent(pk) {
        const url = `${API_URL}/api/events/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteEvent(event){
        const url = `${API_URL}/api/events/${event.pk}`;
        return axios.delete(url);
    }
    createEvent(event){
        console.log(event)
        const url = `${API_URL}/api/events/`;
        return axios.post(url,event);
    }
    updateEvent(event){
        const url = `${API_URL}/api/events/${event.pk}`;
        return axios.put(url,event);
    }
    updateSubscribedUsers(event)
    {
        const url = `${API_URL}/api/events/${event.pk}`;
        return axios.put(url,event);
    }
}