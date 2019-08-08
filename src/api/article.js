import axios from '.';
// import * as CONTS from '@config/consts';
// import { handleMessage } from '@utils'; 

// // 获取文章
// export const getList = ({params, orderBy, page}) => (new Promise((resolve, reject) => {
//   axios({
//     url: '/specialUrl',
//     method: 'post',
//     data: {
//       variables: { params, orderBy, page },
//       query: `
//         query( $params: ArticleParams, $orderBy: ArticleOrderBy, $page: PageInput ){
//           aticleList(params: $params,orderBy: $orderBy, page: $page ){
//             list{ id name desc thumb tags {id name} content status }
//           }
//         }
//       `
//     }
//   }).then(response => {
//     const data = response.data.data.aticleList;
//     resolve(data);
//   }).catch(error => {
//     reject(error);
//   });
// }));


// // 初始化创建项目： 进入文章创建时如果不存在 param.articleId 则先进行初始化
// export const init = () => (new Promise((resolve, reject) => {
//   axios({
//     url: '/specialUrl',
//     method: 'post',
//     data: {
//       variables: { 
//         body: [{
//           name: '初始化标题', 
//           content: '初始化内容', 
//           status: CONTS.ARTICLE_STATUS.DELETE.VALUE
//         }] 
//       },
//       query: `
//         mutation($body: [UpdateAticle!]!){
//           createArticles( body: $body ){ rescode message change{ id } }
//         }
//       `,
//     }
//   })
//   .then((response) => {
//     const data = response.data.data.createArticles;
//     const id = data.change[0].id;
//     resolve(id);
//   })
//   .catch(function (error) {
//     // console.log(error);
//   });
// }));

// /**
//  * 更新文章
//  * @param {Object} body { name, desc, thumb, tags, content, status }
//  */
// export const update = ({body, ids}) => (new Promise((resolve, reject) => {
//   axios({
//     url: '/specialUrl',
//     method: 'post',
//     data: {
//       variables: {
//         body: { ...body },
//         conds: { 
//           ids,
//           status: [ 
//             CONTS.ARTICLE_STATUS.SAVE.VALUE,
//             CONTS.ARTICLE_STATUS.DELETE.VALUE,
//             CONTS.ARTICLE_STATUS.RELEASE.VALUE,
//           ]
//         }
//       },
//       query: `
//         mutation($body: UpdateAticle!, $conds: ArticleParams!){
//           updateArticles(body: $body, conds: $conds){
//             rescode message change { id name desc thumb tags{ id name } content status }
//           }
//         }
//       `
//     },
//   }).then((response) => {
//     const data = response.data.data.updateArticles;
//     resolve(data); 
//   }).catch((error) => {
//     reject(error);
//   });
// }));
