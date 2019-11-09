import _ from 'lodash';
import axios from '@utils/request';

export const uploadPhotos = async ({ files, type, payload }) => {
  const formData = new FormData();
  payload && formData.append('payload', payload);
  _.isFinite(type) && formData.append('type', type);
  files.forEach(v => (formData.append('file', v)));

  const res = await axios({
    data: formData,
    method: 'post',
    url: '/photo/upload',
    timeout: 1000 * 60 * 30,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
};
