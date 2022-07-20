import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getTags = (query = '') => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const searchParams = new URLSearchParams();
  if (query) searchParams.set('query', query);

  const endpoint = `${API_URL}/api/v1/tags?` + searchParams.toString();
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return [
        data.data.tags,
        data.data._meta || { count: data.data.tags.length },
      ];
    });
};

export const tagsService = {
  getTags,
};
