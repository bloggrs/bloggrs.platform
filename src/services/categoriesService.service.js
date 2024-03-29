import { toast } from 'react-toastify';
import { API_URL } from '../config';
import fetch from './fetch';

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
      const success = data.code >= 200 && data.code < 300;
      if (!success) throw data;

      return data.data.category;
    });
};

const createCategory = ({ name, slug, description }) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({ name, slug, description }),
  };

  const endpoint = `${API_URL}/api/v1/categories`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.category;
    });
};

const updateCategory = ({ id, name, slug, description }) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({ name, slug, description }),
  };

  const endpoint = `${API_URL}/api/v1/categories/${id}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      const success = data.code >= 200 && data.code < 300;
      if (!success) throw this;
      return data.data.category;
    });
};

const deleteCategory = id => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  const endpoint = `${API_URL}/api/v1/categories/${id}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const categoriesService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
