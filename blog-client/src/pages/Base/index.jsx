import React from 'react';
import './index.less';
import Header from './subpage/Header';
import Footer from './subpage/Footer';

class Base extends React.Component{
  render(){
    return (
      <div className="base-page">
        <Header />
        <div className="content">
          {this.props.leftMenu}
          {this.props.body}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Base;
