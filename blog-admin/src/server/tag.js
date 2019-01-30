import axios from './index';
export const getTagList = ({ page, params }) => (new Promise((resolve, reject) => {
  axios(
    {
      url: '/specialUrl',
      method: 'post',
      data: {
        variables: {params, page},
        query: `
          query($params: TagParams, $page: PageInput){
            tagList( params: $params, page: $page ){
              list{ name, icon id parent {id name} updateTime status color}
              page{ page pageSize}
              stats{ total }
              change{name}    
              rescode
              message
            }
          }`,
      }
    }
  )
  .then(function (response) {
    const data = response.data.data.tagList;
    resolve(data);
  })
  .catch(function (error) {
    // console.log(error);
  });
}));

export const createTags = ({body}) => (new Promise((resolve, reject) => {
  axios(
    {
      url: '/specialUrl',
      method: 'post',
      data: {
        "query": `
          mutation{
            createTags(
              body: [{
                name: "${ body.name || "" }", 
                icon: "${ body.icon || "" }", 
                color: "${ body.color || "" }", 
              }]
            ){
              change{name}    
              rescode
              message
            }
          }
        `,
      }
    }
  )
  .then(function (response) {
    const data = response.data.data.getTagList;
    resolve(data);
  })
  .catch(function (error) {
    // console.log(error);
  });
}));


export const updateTagByIds = ({ id, body = {} }) => (new Promise((resolve, reject) => {
  axios(
    {
      url: '/specialUrl',
      method: 'post',
      data: {
        "query": `
          mutation{
            updateTagByIds(
              ids: ["${id}"],
              body: {
                name: "${ body.name || "" }", 
                icon: "${ body.icon || "" }", 
                color: "${ body.color || "" }", 
              }
            ){
              change{name}    
              rescode
              message
            }
          }
        `,
      }
    }
  )
  .then(function (response) {
    const data = response.data.data.getTagList;
    resolve(data);
  })
  .catch(function (error) {
    // console.log(error);
  });
}));

export const removeTagByIds = ({ id, body = {} }) => (new Promise((resolve, reject) => {
  axios(
    {
      url: '/specialUrl',
      method: 'post',
      data: {
        "query": `
          mutation{
            removeTagByIds( ids: ["${id}"]){
              change{name}    
              rescode
              message
            }
          }
        `,
      }
    }
  )
  .then(function (response) {
    const data = response.data.data.getTagList;
    resolve(data);
  })
  .catch(function (error) {
    // console.log(error);
  });
}));
