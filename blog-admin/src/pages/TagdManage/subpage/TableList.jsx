import React from 'react';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';
import columns from '../../../config/columns/tag';
import { Card, Table } from 'antd';


@inject('tag')
@observer
class TableList extends React.Component{
  /**
   * 设置当前页 page 以及 pageSize
   */
  onPaginationChange = (page = 1, pageSize = 10) => {
    this.props.tag.setPage(page, pageSize);
  }

  render(){
    console.log(this.props)
    return (
      <div className="ptbw">
        <Card>
          <Table 
            columns={columns} 
            dataSource={this.props.tag.data.list.toJS()}
            pagination={{
              onChange: this.onPaginationChange,
              pageSize: this.props.tag.page.pageSize,
              total: this.props.tag.data.length,
              current: this.props.tag.page.current,
            }} 
          />
        </Card>
      </div>
    );
  }
}

export default TableList;
