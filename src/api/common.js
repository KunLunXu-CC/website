import axios from '.';

// export const getOptions = ({model, page, params}) => new Promise((resolve, reject) => {
//   axios({
//       url: '/specialUrl',
//       method: 'post',
//       data: {
//         variables: { model, page, params },
//         query: `
//           query ($model: String!, $page: PageInput, $params: OptionsParams){
//             options( model: $model, page: $page, params: $params){ 
//               list { id name } 
//               page { page pageSize } 
//               stats { total totalPage } 
//             }
//           }
//         `,
//       }
//     }
//   ).then(function (response) {
//     const data = response.data.data.options;
//     resolve(data);
//   }).catch(function (error) {
//     // console.log(error);
//   });
// });
