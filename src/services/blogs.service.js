import { toast } from 'react-toastify';
import { API_URL } from '../config';
import qs from 'qs';

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

const getBlog = id => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogs/` + id;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.blog;
    });
};

const getPosts = ({ BlogId, query }) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint =
    `${API_URL}/api/v1/blogs/` + BlogId + '/posts?' + qs.stringify(query || '');
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.posts;
    });
};

const deleteBlogPost = id => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/posts/` + id;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      toast.success('Post deleted successfully');
      return id;
    });
};

export const blogsService = {
  createBlog,
  getBlog,
  getPosts,
  deleteBlogPost,
};
