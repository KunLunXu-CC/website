import React from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


const client = new ApolloClient({
  uri: "http://localhost:4000/specialUrl"
});




client
  .query({
    query: gql`
      query{
        getTagList(
          params: {name: "标签"}
          page: {page: 1, pageSize: 10}
        ){
          list{name, icon id, parent {id name}}
          page{page pageSize total}
          change{name}    
          rescode
          message
        }
      }
    `
  })
  .then(result => console.log(result));

class ArticleCreation extends React.Component{
  render(){
    return (
      <div>
        ArticleCreation        
      </div>
    );
  }
}
export default ArticleCreation;
