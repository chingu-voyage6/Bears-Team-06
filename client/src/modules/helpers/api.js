import axios from 'axios';

import { getItem } from 'lib';

const getAPI = (url, requireToken) => {
  const config = {};
  if (requireToken) {
    const token = getItem('accessToken');
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return axios.get(url, config);
};

const postAPI = (url, body, requireToken) => {
  const config = {};
  if (requireToken) {
    const token = getItem('accessToken');
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return axios.post(url, body, config);
};

export { getAPI, postAPI };
