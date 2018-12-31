import React from 'react';
import './index.less';
import Header from '../Header/index';
import Footer from '../Footer/index'

class Base extends React.Component{
  render(){
    return (
      <div className="base-page">
        <Header />
        <div className="content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Base;
