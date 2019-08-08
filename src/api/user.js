import axios from '.';

export const login = ({ account, password }) => (new Promise((resolve, reject) => {
  axios(
    {
      url: '/specialUrl',
      method: 'post',
      data: {
        variables: { account, password },
        query: `
        mutation($account: String, $password: String){
          login( account: $account, password: $password ){ 
            rescode 
            message 
          }
        }`,
      }
    }
  )
  .then(function (response) {
    
  })
  .catch(function (error) {
  
  });
}));
