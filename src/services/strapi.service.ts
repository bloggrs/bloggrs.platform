import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_STRAPI_API_URL;

const getContent = (pageId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  const endpoint = `${API_URL}/pages/${pageId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch content');
      }
      return res.json();
    })
    .then(data => {
      return data.data;
    })
    .catch(error => {
      toast.error('Failed to fetch content: ' + error.message);
      throw error;
    });
};

const updateContent = (pageId: string, content: any) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({ content }),
  };

  const endpoint = `${API_URL}/pages/${pageId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update content');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Content updated successfully');
      return data.data;
    })
    .catch(error => {
      toast.error('Failed to update content: ' + error.message);
      throw error;
    });
};

export const strapiService = {
  getContent,
  updateContent,
};
