import React from 'react';
import { observer, inject } from 'mobx';
import { Form, Card, Input, Button } from 'antd';

@Form.create({})
class QueryBlock extends React.Component{
  
  onSearch = () => {

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Card>
        <Form layout="inline">
          <Form.Item>
            {getFieldDecorator('userName')(
              <Input placeholder="标签名" size="large"/>
            )}
          </Form.Item>
          <Form.Item>
            <Button 
              size="large" 
              type="primary" 
              onClick={this.onSearch}
            >
              查询
          </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default QueryBlock;
