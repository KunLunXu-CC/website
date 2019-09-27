import axios from '@utils/request';

export const uploadPhotos = ({ body }) => {
  // console.log('===>>>>>>>>>>>>>>>> body', body);
  // const formData = new FormData();

  // formData.append(
  //   'operations', `  { 
  //     "query": "mutation($body: UploadPhotos!){uploadPhotos( body: $body ){rescode message}}", 
  //     "variables": { "body": {"files": [null]} } 
  //   }`
  // );
  
  // formData.append('map', '{ "0": ["variables.body.files.0"] }'  );
  // formData.append('0', '@2019-09-19_13-46.png'  );
  // formData.append('files',  body.files );

  // formData.append('variables', { body });
  // formData.append('query', `
  // mutation($body: UploadPhotos!){
  //   uploadPhotos( body: $body ){
    //   rescode 
    //   message 
    // }
  // }`);

  axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    headers: {"Content-Type": "multipart/form-data"},
    data: {},
  }).then(res => {
    return res.data.data.login;
  }).catch(err => {
  
  })
};
