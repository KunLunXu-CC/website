import axios from './index';
import { handleMessage } from '../utils/helper'; 

export const createArticle = ({body}) => (new Promise((resolve, reject) => {
  axios({
    url: '/specialUrl',
    method: 'post',
    data: {
      variables: { body: [body] },
      query: `
        mutation($body: [UpdateAticle!]!){
          createArticles( body: $body ){ rescode message }
        }
      `,
    }
  })
  .then(function (response) {
    const data = response.data.data.createArticles;
    handleMessage({
      rescode: data.rescode,
      message: data.message
    });
    resolve(data);
  })
  .catch(function (error) {
    // console.log(error);
  });
}));
