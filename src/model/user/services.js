import axios from '@utils/request';

export const login = axios({
  query: `
    mutation(
      $account: String,
      $password: String,
    ){
      login(
        account: $account,
        password: $password,
      ){
        user {
          id
          sex
          name
          status
          account
          role { id desc auth name }
        }
        message
      }
    }`,
  getRes: (res) => res.login?.user,
});

// 获取公钥
export const getPublicKey = axios({
  query: `
    query {
      publicKey {
        data
      }
    }`,
  getRes: (res) => res.publicKey?.data,
});
