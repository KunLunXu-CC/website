import React, { Component } from 'react';
import ArticleListCard from '@components/ArticleListCard/index';
import IMG from '@assets/img/2018-11-2218:12:17.png';

class Home extends Component{
  render(){
    return (
      <div>
        <div style={{background: 'blue'}}>11111</div>
        <div style={{width: '50%', height: '200px'}}>
          <ArticleListCard 
            img={IMG}
          />
        </div>
        
      </div>
    );
  }
}
export default Home;
