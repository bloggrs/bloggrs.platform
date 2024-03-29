import { toast } from 'react-toastify';
import { API_URL } from '../config';
import qs from 'qs';
import fetch from './fetch';

const createBlog = ({
  name,
  description,
  thumbnail,
  BlogCategory,
  BlogThemeId,
  username,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({
      name,
      description,
      thumbnail,
      BlogCategory,
      BlogThemeId,
      username,
    }),
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

const getMyBlogs = id => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/blogs`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.blogs;
    });
};

const getBlogCategories = (id, query) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint =
    `${API_URL}/api/v1/blogs/${id}/categories?query=` + query || '';
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.categories;
    });
};

const getPosts = ({ BlogId = 1, query }) => {
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
      return [
        data.data.posts,
        data.data._meta || { count: data.data.posts.length },
      ];
    });
};

const getPost = id => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/posts/${id}`;
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.post;
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

const createBlogPost = ({
  title,
  description,
  html_content,
  BlogId,
  categories,
}) => {
  if (!categories) categories = [];
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({
      title,
      categories,
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
const updateBlog = ({
  id,
  name,
  description,
  thumbnail,
  BlogCategory,
  BlogThemeId,
  username,
}) => {
  const data = {
    name,
    description,
    thumbnail,
    BlogCategory,
    BlogThemeId,
    username,
  };
  let body = {};
  for (let key of Object.keys(data)) {
    const value = data[key];
    if (value) body[key] = value;
  }
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(body),
  };
  const endpoint = `${API_URL}/api/v1/blogs/${id}`; // /` + BlogId + '/posts';
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.post;
    });
};

const updateBlogPost = ({
  id,
  title,
  description,
  html_content,
  BlogId,
  categories,
}) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({
      title,
      categories,
      description,
      html_content,
      BlogId: Number(BlogId),
      slug: title.toLocaleLowerCase().replace(/ /g, '-'),
    }),
  };
  const endpoint = `${API_URL}/api/v1/posts/${id}`; // /` + BlogId + '/posts';
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
  const endpoint = `${API_URL}/api/v1/postcomments/` + id;
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
    `/postcomments?BlogId=${BlogId}&` +
    qs.stringify(query || '');
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.data.postcomments;
    });
};

export const blogsService = {
  createBlog,
  getBlog,
  updateBlog,
  getMyBlogs,
  getBlogCategories,
  getPosts,
  getPost,
  updateBlogPost,
  deleteBlogPost,
  createBlogPost,
  deleteBlogComment,
  getComments,
};
