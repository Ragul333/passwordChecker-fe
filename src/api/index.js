import axios from 'axios';

export const createResult = (data) => axios.post('https://passwordchecker-be.onrender.com/create', data);