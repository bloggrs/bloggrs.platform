import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getRoles = (query = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/roles?${new URLSearchParams(query)}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch roles');
      }
      return res.json();
    })
    .then(data => {
      return data.data.roles;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

const getRole = roleId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/roles/${roleId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch role');
      }
      return res.json();
    })
    .then(data => {
      return data.data.role;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

const createRole = ({
  name,
  value,
  description,
  isSystem,
  permissions,
  parentRoleId,
  tenantId,
}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({
      name,
      value,
      description,
      isSystem,
      permissions,
      parentRoleId,
      tenantId,
    }),
  };
  const endpoint = `${API_URL}/api/v1/roles`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to create role');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Role created successfully');
      return data.data.role;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

const updateRole = (roleId, roleData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(roleData),
  };
  const endpoint = `${API_URL}/api/v1/roles/${roleId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update role');
      }
      return res.json();
    })
    .then(data => {
      toast.success('Role updated successfully');
      return data.data.role;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

const deleteRole = roleId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/roles/${roleId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete role');
      }
      return res.json();
    })
    .then(() => {
      toast.success('Role deleted successfully');
      return roleId;
    })
    .catch(error => {
      toast.error(error.message);
      throw error;
    });
};

export const rolesService = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
