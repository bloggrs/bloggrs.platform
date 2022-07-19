import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getCategories = (query = '', page = 1, pageSize = 10) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const searchParams = new URLSearchParams();
  if (query) searchParams.set('query', query);
  if (page) searchParams.set('page', page);
  if (pageSize) searchParams.set('pageSize', pageSize);

  const endpoint = `${API_URL}/api/v1/categories?` + searchParams.toString();
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return [data.data.categories, data.data._meta];
    });
};

const getCategoryById = id => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  const endpoint = `${API_URL}/api/v1/categories/${id}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.category;
    });
};

export const categoriesService = {
  getCategories,
  getCategoryById,
};
