import { toast } from 'react-toastify';
import { API_URL } from '../config';

const handleErrorResponse = async response => {
  const errorData = await response.json();
  switch (errorData.code) {
    case 400:
      toast.error(
        errorData.message || 'Invalid request. Please check your input.',
      );
      return;
    case 401:
      toast.error('You are not authorized to perform this action');
      return;
    case 403:
      toast.error('You do not have permission to perform this action');
      return;
    case 404:
      toast.error('Instance not found');
      return;
    default:
      toast.error(errorData.message || 'An unexpected error occurred');
      return;
  }
};

const getServerIdByBlogId = async blogId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  try {
    const response = await fetch(
      `${API_URL}/api/v1/blogs/${blogId}/instance`,
      requestOptions,
    );
    if (!response.ok) {
      await handleErrorResponse(response);
      return null;
    }
    const data = await response.json();
    return data.data.server_id;
  } catch (error) {
    toast.error('Failed to fetch server information');
    return null;
  }
};

const fetchServerData = async serverId => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  try {
    const [statusRes, logsRes, statsRes] = await Promise.all([
      fetch(`${API_URL}/api/v1/instances/${serverId}/status`, requestOptions),
      fetch(`${API_URL}/api/v1/instances/${serverId}/logs`, requestOptions),
      fetch(`${API_URL}/api/v1/instances/${serverId}/stats`, requestOptions),
    ]);

    const responses = await Promise.all([
      statusRes.ok ? statusRes.json() : handleErrorResponse(statusRes),
      logsRes.ok ? logsRes.json() : handleErrorResponse(logsRes),
      statsRes.ok ? statsRes.json() : handleErrorResponse(statsRes),
    ]);

    const [statusData, logsData, statsData] = responses;

    if (!statusData || !logsData || !statsData) return null;

    if (
      statusData.data.status === 'running' &&
      statsData.data &&
      statsData.data.port
    ) {
      const port = statsData.data.port;
      toast.success(`Server is running on http://localhost:${port}`, {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }

    return {
      status: statusData.data.status,
      logs: logsData.data.logs,
      stats: statsData.data,
    };
  } catch (error) {
    console.error('Error fetching server data:', error);
    toast.error('Failed to fetch server data');
    return null;
  }
};

const executeCommand = async (serverId, command) => {
  console.log('Executing command:', command);

  try {
    const response = await fetch(
      `${API_URL}/api/v1/instances/${serverId}/command`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('bloggrs:token')}`,
        },
        body: JSON.stringify({ command }),
      },
    );

    if (!response.ok) {
      await handleErrorResponse(response);
      return null;
    }

    const data = await response.json();
    if (!data.data || !data.data.output) {
      toast.error('Invalid response format from server');
      return null;
    }

    return data.data.output;
  } catch (error) {
    console.error('Error executing command:', error);
    toast.error('Failed to execute command');
    return null;
  }
};

const controlServer = async (serverId, action) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  try {
    const response = await fetch(
      `${API_URL}/api/v1/instances/${serverId}/${action}`,
      requestOptions,
    );

    if (!response.ok) {
      await handleErrorResponse(response);
      return false;
    }

    const data = await response.json();
    return data.code === 200;
  } catch (error) {
    toast.error(`Failed to ${action} server`);
    return false;
  }
};

export const consoleService = {
  getServerIdByBlogId,
  fetchServerData,
  executeCommand,
  controlServer,
};
