import axios from '@utils/request';

export const getTagList = ({ page, params } = {}) => axios({
  url: GLOBAL_SERVICE.GRAPHQL_URL,
  method: 'post',
  data: {
    variables: { params, page },
    query: `
      query($params: TagParams, $page: Page){
        tagList( params: $params, page: $page, orderBy: { creationTime: -1 } ){
          list{ name, icon id parent { id name } updateTime status color}
          stats{ total }   
          rescode
          message
        }
      }`,
  }
}).then(res => {
  return res.data.data.tagList;
}).catch(err => {

});
