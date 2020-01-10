import axios from '@utils/request';

export const getPublicKey = async () => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
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
  return res.data.data.publicKey;
};

export const place = () => {

};
