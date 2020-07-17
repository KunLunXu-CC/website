import React from 'react';
import Node from './Node';
import Edge from './Edge';
import Multi from './Multi';
import Canvas from './Canvas';
import scss from './index.module.scss';

// import upperFirst from 'lodash/upperFirst';
// import { Card, Form, Input } from 'antd';
// import { DetailPanel, withEditorContext } from 'gg-editor';

// const { Item } = Form;

// const formItemLayout = {
//   labelCol: {
//     span: 5,
//   },
//   wrapperCol: {
//     span: 19,
//   },
// };

// class Panel extends React.Component {
//   handleSubmit = e => {
//     if (e && e.preventDefault) {
//       e.preventDefault();
//     }

//     const { form } = this.props;

//     form.validateFieldsAndScroll((err, values) => {
//       if (err) {
//         return;
//       }

//       const { type, nodes, edges, executeCommand } = this.props;

//       const item = type === 'node' ? nodes[0] : edges[0];

//       if (!item) {
//         return;
//       }

//       executeCommand('update', {
//         id: item.get('id'),
//         updateModel: {
//           ...values,
//         },
//       });
//     });
//   };

//   renderNodeDetail = () => {
//     const { form } = this.props;

//     return (
//       <Form>
//         <Item label="Label" {...formItemLayout}>
//           {form.getFieldDecorator('label', {
//             initialValue: '',
//           })(<Input onBlur={this.handleSubmit} />)}
//         </Item>
//       </Form>
//     );
//   };

//   renderEdgeDetail = () => {
//     const { form } = this.props;

//     return (
//       <Form>
//         <Item label="Label" {...formItemLayout}>
//           {form.getFieldDecorator('label', {
//             initialValue: '',
//           })(<Input onBlur={this.handleSubmit} />)}
//         </Item>
//       </Form>
//     );
//   };

//   renderMultiDetail = () => {
//     return null;
//   };

//   renderCanvasDetail = () => {
//     return <p>Select a node or edge :)</p>;
//   };

//   render() {
//     const { type } = this.props;

//     return (
//       <Card title={upperFirst(type)} bordered={false}>
//         {type === 'node' && this.renderNodeDetail()}
//         {type === 'edge' && this.renderEdgeDetail()}
//         {type === 'multi' && this.renderMultiDetail()}
//         {type === 'canvas' && this.renderCanvasDetail()}
//       </Card>
//     );
//   }
// }

// const WrappedPanel = Form.create({
//   mapPropsToFields(props) {
//     const { type, nodes, edges } = props;

//     let label = '';

//     if (type === 'node') {
//       label = nodes[0].getModel().label;
//     }

//     if (type === 'edge') {
//       label = edges[0].getModel().label;
//     }

//     return {
//       label: Form.createFormField({
//         value: label,
//       }),
//     };
//   },
// })(withEditorContext(Panel));

// const NodePanel = DetailPanel.create('node')(Node);
// const EdgePanel = DetailPanel.create('edge')(() => 'edge');
// const MultiPanel = DetailPanel.create('multi')(() => 'multi');
// const CanvasPanel = DetailPanel.create('canvas')(() => 'canvas');

export default props => (
  <div className={scss.panel}>
    <div className={scss.main}>
      <Node></Node>
      <Edge></Edge>
      <Multi></Multi>
      <Canvas></Canvas>
    </div>
    <div className={scss.extend}>
      {props.children}
    </div>
  </div>
);
