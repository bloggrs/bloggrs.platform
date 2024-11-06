import { toast } from 'react-toastify';
import { API_URL } from '../config';

const getTeamMemberPermissions = (query = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammemberpermissions?${new URLSearchParams(
    query,
  )}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          if (data.status === 'error') {
            throw new Error(data.message);
          }
          throw new Error('Failed to fetch team member permissions');
        });
      }
      return res.json();
    })
    .then(data => {
      return {
        teammemberpermissions: data.data.teammemberspermissions,
        pagination: data.data.pagination,
      };
    })
    .catch(error => {
      toast.error(error.response?.data?.message || error.message);
      return { teammemberpermissions: [], pagination: {} };
    });
};

const getTeamMemberPermission = permissionId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammemberpermissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          if (data.status === 'error') {
            throw new Error(data.message);
          }
          throw new Error('Failed to fetch team member permission');
        });
      }
      return res.json();
    })
    .then(data => {
      return data.data.teammemberspermissions;
    })
    .catch(error => {
      toast.error(error.response?.data?.message || error.message);
      return null;
    });
};

const createTeamMemberPermission = permissionData => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(permissionData),
  };
  const endpoint = `${API_URL}/api/v1/teammemberpermissions`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          if (data.status === 'error') {
            throw new Error(data.message);
          }
          throw new Error('Failed to create team member permission');
        });
      }
      return res.json();
    })
    .then(data => {
      toast.success('Team member permission created successfully');
      return data.data.teammemberspermissions;
    })
    .catch(error => {
      toast.error(error.response?.data?.message || error.message);
      return null;
    });
};

const updateTeamMemberPermission = (permissionId, permissionData) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify(permissionData),
  };
  const endpoint = `${API_URL}/api/v1/teammemberpermissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          if (data.status === 'error') {
            throw new Error(data.message);
          }
          throw new Error('Failed to update team member permission');
        });
      }
      return res.json();
    })
    .then(data => {
      toast.success('Team member permission updated successfully');
      return data.data.teammemberspermissions;
    })
    .catch(error => {
      toast.error(error.response?.data?.message || error.message);
      return null;
    });
};

const deleteTeamMemberPermission = permissionId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammemberpermissions/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          if (data.status === 'error') {
            throw new Error(data.message);
          }
          throw new Error('Failed to delete team member permission');
        });
      }
      return res.json();
    })
    .then(() => {
      toast.success('Team member permission deleted successfully');
      return permissionId;
    })
    .catch(error => {
      toast.error(error.response?.data?.message || error.message);
      return null;
    });
};

const deleteTeamMemberPermissions = teammemberId => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammemberpermissions/teamMember/${teammemberId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          if (data.status === 'error') {
            throw new Error(data.message);
          }
          throw new Error('Failed to delete team member permissions');
        });
      }
      return res.json();
    })
    .then(() => {
      toast.success('Team member permissions deleted successfully');
      return teammemberId;
    })
    .catch(error => {
      toast.error(error.response?.data?.message || error.message);
      return null;
    });
};

const deleteSpecificTeamMemberPermission = (teammemberId, permissionId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };
  const endpoint = `${API_URL}/api/v1/teammemberpermissions/teamMember/${teammemberId}/permission/${permissionId}`;
  return fetch(endpoint, requestOptions)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          if (data.status === 'error') {
            throw new Error(data.message);
          }
          throw new Error('Failed to delete specific team member permission');
        });
      }
      return res.json();
    })
    .then(() => {
      toast.success('Team member permission deleted successfully');
      return { teammemberId, permissionId };
    })
    .catch(error => {
      toast.error(error.response?.data?.message || error.message);
      return null;
    });
};

export const teamMemberPermissionsService = {
  getTeamMemberPermissions,
  getTeamMemberPermission,
  createTeamMemberPermission,
  updateTeamMemberPermission,
  deleteTeamMemberPermission,
  deleteTeamMemberPermissions,
  deleteSpecificTeamMemberPermission,
};
