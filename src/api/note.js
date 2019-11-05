import axios from '@utils/request';

export const getNotes = async ({ pagination, search } = {}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { search, pagination },
      query: `
        query($search: NoteSearch, $pagination: Pagination){
          notes( search: $search, pagination: $pagination, orderBy: { creationTime: -1 } ){
            list {id name desc thumb content tags { id name }}
            pagination 
            rescode
            message
          }
        }`,
    }
  });
  return res.data.data.notes;
};
