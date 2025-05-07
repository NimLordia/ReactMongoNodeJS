import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7000/', // proxy handles localhost:7000
});

export const getNotes = () => API.get('/notes');
export const getNote = (id) => API.get(`/notes/${id}`);
export const createNote = (note) => API.post('/notes', note);
export const updateNote = (id, note) => API.put(`/notes/${id}`, note);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
