import axios from './index';

export const getTagList = ({ page, params }) => (new Promise((resolve, reject) => {
  axios(
    {
      url: '/specialUrl',
      method: 'post',
      data: {
        variables: {name: 'qianyin1'},
        query: `
          query($name: String){
            getTagList(
              params: {name: $name}
              page: {page: ${page.page || 1}, pageSize: ${page.pageSize || 10}}
            ){
              list{ name, icon id parent {id name} updateTime status color}
              page{ page pageSize total}
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
              list{ name, icon id parent {id name} updateTime status color}
              page{ page pageSize total}
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
              list{ name, icon id parent {id name} updateTime status color}
              page{ page pageSize total}
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
              list{ name, icon id parent {id name} updateTime status color}
              page{ page pageSize total}
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
