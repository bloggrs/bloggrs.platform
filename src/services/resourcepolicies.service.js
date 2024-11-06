import { toast } from 'react-toastify';
import { API_URL } from '../config';

const handleApiError = (error) => {
  // Extract error message from response if available
  const message = error.data?.message || error.message || 'An unexpected error occurred';
  toast.error(message);
  throw error;
};

const getResourcePolicies = (query = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/resourcepolicies?${new URLSearchParams(
    query,
  )}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch resource policies');
      }
      return res.json();
    })
    .then(data => {
      return {
        resourcePolicies: data.data.resourcePolicies,
        pagination: data.data.pagination,
      };
    })
    .catch(error => {
      const message = error.data?.message || 'Failed to fetch resource policies';
      toast.error(message);
      throw error;
    });
};

const getResourcePolicy = policyId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/resourcepolicies/${policyId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch resource policy');
      }
      return res.json();
    })
    .then(data => {
      return data.data.resourcePolicy;
    })
    .catch(error => {
      const message = error.data?.message || 'Failed to fetch resource policy';
      toast.error(message);
      throw error;
    });
};

const getPoliciesForResource = (resourceType, resourceId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/resourcepolicies/resource/${resourceType}/${resourceId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch resource policies');
      }
      return res.json();
    })
    .then(data => {
      return data.data.resourcePolicies;
    })
    .catch(error => {
      const message = error.data?.message || 'Failed to fetch resource policies';
      toast.error(message);
      throw error;
    });
};

const createResourcePolicy = policyData => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(policyData),
  };
  const endpoint = `${API_URL}/api/v1/resourcepolicies`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to create resource policy');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Resource policy created successfully');
      return data.data.resourcePolicy;
    })
    .catch(error => {
      const message = error.data?.message || 'Failed to create resource policy';
      toast.error(message);
      throw error;
    });
};

const updateResourcePolicy = (policyId, policyData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(policyData),
  };
  const endpoint = `${API_URL}/api/v1/resourcepolicies/${policyId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update resource policy');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Resource policy updated successfully');
      return data.data.resourcePolicy;
    })
    .catch(error => {
      const message = error.data?.message || 'Failed to update resource policy';
      toast.error(message);
      throw error;
    });
};

const deleteResourcePolicy = policyId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/resourcepolicies/${policyId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete resource policy');
      }
      return res.json();
    })
    .then(() => {
      toast.success('Resource policy deleted successfully');
      return policyId;
    })
    .catch(error => {
      const message = error.data?.message || 'Failed to delete resource policy';
      toast.error(message);
      throw error;
    });
};

const deleteResourcePolicies = (resourceType, resourceId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/resourcepolicies/resource/${resourceType}/${resourceId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete resource policies');
      }
      return res.json();
    })
    .then(() => {
      toast.success('Resource policies deleted successfully');
      return { resourceType, resourceId };
    })
    .catch(error => {
      const message = error.data?.message || 'Failed to delete resource policies';
      toast.error(message);
      throw error;
    });
};

export const resourcePoliciesService = {
  getResourcePolicies,
  getResourcePolicy,
  getPoliciesForResource,
  createResourcePolicy,
  updateResourcePolicy,
  deleteResourcePolicy,
  deleteResourcePolicies,
};
