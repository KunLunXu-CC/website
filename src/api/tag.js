import axios from '@utils/request';

export const getTags = ({ pagination, search } = {}) => axios({
  url: GLOBAL_SERVICE.GRAPHQL_URL,
  method: 'post',
  data: {
    variables: { search, pagination },
    query: `
      query($search: TagSearch, $pagination: Pagination){
        tags( search: $search, pagination: $pagination, orderBy: { creationTime: -1 } ){
          list{ name, icon id parent { id name } updateTime status color}
          pagination 
          rescode
          message
        }
      }`,
  }
}).then(res => {
  return res.data.data.tags;
}).catch(err => {

});
