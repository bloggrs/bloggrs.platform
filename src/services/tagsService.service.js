import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getTags = (query = '', page = 1, pageSize = 10) => {
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

  const endpoint = `${API_URL}/api/v1/tags?` + searchParams.toString();
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return [data.data.tags, data.data._meta];
    });
};

const getTagById = id => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  const endpoint = `${API_URL}/api/v1/tags/${id}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      const success = data.code >= 200 && data.code < 300;
      if (!success) throw data;

      return data.data.tag;
    });
};

const createTag = ({ name, slug, description }) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({ name, slug, description }),
  };

  const endpoint = `${API_URL}/api/v1/tags`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.tag;
    });
};

const updateTag = ({ id, name, slug, description }) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({ name, slug, description }),
  };

  const endpoint = `${API_URL}/api/v1/tags/${id}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      const success = data.code >= 200 && data.code < 300;
      if (!success) throw this;
      return data.data.tag;
    });
};

const deleteTag = id => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  const endpoint = `${API_URL}/api/v1/tags/${id}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};

export const tagsService = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
