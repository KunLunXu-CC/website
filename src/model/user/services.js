import axios from '@utils/request';

export const login = async ({
  account,
  password,
} = {}) => {
  const res = await axios({
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { account, password },
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
    },
  });
  return res?.data?.data?.login?.user;
};

export const getPublicKey = async () => {
  const res = await axios({
    url: GLOBAL_SERVICER.GRAPHQL_URL,
    method: 'post',
    data: {
      query: `
        query {
          publicKey {
            data
          }
        }`,
    },
  });
  return res?.data?.data?.publicKey?.data;
};
