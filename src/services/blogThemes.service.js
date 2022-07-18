import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getBlogThemes = (query = '') => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `${API_URL}/api/v1/blogThemes?query=` + query;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.blogthemes;
    });
};

export const blogThemesService = {
  getBlogThemes,
};
