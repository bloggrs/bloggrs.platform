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

const createBlogPost = ({ title, description, html_content, BlogId }) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({
      title,
      description,
      html_content,
      BlogId: Number(BlogId),
      slug: title.toLocaleLowerCase().replace(/ /g, '-'),
    }),
  };
  const endpoint = `${API_URL}/api/v1/posts`; // /` + BlogId + '/posts';
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.post;
    });
};

const deleteBlogComment = id => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/comments/` + id;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      toast.success('Comment deleted successfully');
      return id;
    });
};

const getComments = ({ BlogId, query }) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint =
    `${API_URL}/api/v1/` +
    `/comments?BlogId=${BlogId}&` +
    qs.stringify(query || '');
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.comments;
    });
};

export const blogsService = {
  createBlog,
  getBlog,
  getPosts,
  deleteBlogPost,
  createBlogPost,
  deleteBlogComment,
  getComments,
};
