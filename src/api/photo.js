import axios from '@utils/request';

export const uploadPhotos = ({ body }) => {
  const formData = new FormData();
  body.files.forEach(v => (formData.append('file', v)));
  
  axios({
    data: formData,
    method: 'post',
    url: '/photo/upload',
    headers: {"Content-Type": "multipart/form-data"},
  }).then(res => {
    return res.data.data.login;
  }).catch(err => {

  })
};
