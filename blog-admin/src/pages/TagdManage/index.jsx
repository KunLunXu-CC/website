import React from 'react';
import './index.scss';
import { inject } from 'mobx-react';
import QueryBlock from './subpage/QueryBlock';
import TableList from './subpage/TableList';
import CreateAndModify from './subpage/CreateAndModify';

@inject('tag')
class TagdManage extends React.Component{
  render(){
    console.log('------------>');
    console.log(this.props);
    return (
      <div>
        <QueryBlock />
        <TableList/>
        <CreateAndModify />
      </div>
    );
  }
}
export default TagdManage;
