import axios from './index';

export const getOptions = () => new Promise((resolve, reject) => {
  axios(
    {
      url: '/specialUrl',
      method: 'post',
      data: {
        variables: {},
        query: `
          query {
            options(
              model: "Tag",
              page:{
                page: 2,
                pageSize: 5
              },
              params: {
                ids: ["5c67d18102579c65a8764a09"],
                # name: ""
              }
            ){ list { id name} stats{total totalPage} page{page pageSize} }
          }
        `,
      }
    }
  )
  .then(function (response) {
    
  })
  .catch(function (error) {
    // console.log(error);
  });
});
