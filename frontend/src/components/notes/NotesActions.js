import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_NOTES, ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "./NotesTypes";

export const getNotes = () => dispatch => {
  axios
    .get("/api/events")
    .then(response => {
      dispatch({
        type: GET_NOTES,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const addNote = note => dispatch => {
  axios
    .post("/api/events/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const deleteNote = id => dispatch => {
  axios
    .delete(`/api/events${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_NOTE,
        payload: id
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const updateNote = (id, note) => dispatch => {
  axios
    .patch(`/api/events/${id}/`, note)
    .then(response => {
      dispatch({
        type: UPDATE_NOTE,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};
