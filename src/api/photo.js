import axios from '@utils/request';

export const uploadPhotos = ({ body }) => {
  // console.log('===>>>>>>>>>>>>>>>> body', body);
  // const formData = new FormData();
  // formData.append('map', '{ "0": ["variables.body.files.0"] }'  );
  // formData.append('0', '@2019-09-19_13-46.png'  );
  // formData.append('files',  body.files );

  axios({
    url: '/photo/upload',
    method: 'post',
    headers: {"Content-Type": "multipart/form-data"},
    data: {},
  }).then(res => {
    return res.data.data.login;
  }).catch(err => {
  
  })
};
