import React from 'react';
import { Link } from 'react-router-dom';
class HomePage extends React.Component{
  render(){
    return (
      <div>
        home page
        <Link to="/article/creation">标签</Link>
      </div>
    );
  }
}
export default HomePage;
