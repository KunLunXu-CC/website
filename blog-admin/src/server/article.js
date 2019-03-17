import axios from './index';
import * as CONTS from '@config/conts';
import { handleMessage } from '@utils'; 

/**
 * 初始化创建项目： 进入文章创建时如果不存在 param.articleId 则先进行初始化， 后
 * @param {} param0 
 */
export const init = () => (new Promise((resolve, reject) => {
  axios({
    url: '/specialUrl',
    method: 'post',
    data: {
      variables: { 
        body: [{
          name: '初始化标题', 
          content: '初始化内容', 
          status: CONTS.ARTICLE_STATUS.DISABLE.VALUE
        }] 
      },
      query: `
        mutation($body: [UpdateAticle!]!){
          createArticles( body: $body ){ rescode message change{ id } }
        }
      `,
    }
  })
  .then(function (response) {
    const data = response.data.data.createArticles;
    const id = data.change[0].id;
    resolve(id);
  })
  .catch(function (error) {
    // console.log(error);
  });
}));
