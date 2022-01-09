import { toast } from 'react-toastify';
import { API_URL } from '../config';

const createBlog = ({ name, description, BlogCategoryId, logo_url }) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({ name, description, BlogCategoryId, logo_url }),
  };
  const endpoint = `${API_URL}/api/v1/blogs`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.blog;
    });
};

export const blogsService = {
  createBlog,
};
