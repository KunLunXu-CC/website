import {
  Col,
  Row,
  Form,
  DatePicker,
  InputNumber,
} from 'antd';

export default () => (
  <Row gutter={24}>
    <Col span={12}>
      <Form.Item
        name="name"
        label="日期"
        rules={[{
          required: true,
          message: '请填写日期',
        }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label="体重 (KG)"
        name={['bodyIndex', 'weight']}>
        <InputNumber
          min={50}
          placeholder="体重"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label="起居"
        name="getUp">
        <DatePicker
          showTime
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label="体脂 (%) "
        name={['bodyIndex', 'bodyfat']}>
        <InputNumber
          min={8}
          max={100}
          placeholder="体脂"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label="歇息"
        name="toRest">
        <DatePicker
          showTime
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label="水分 (%) "
        name={['bodyIndex', 'moistureContent']}>
        <InputNumber
          min={10}
          max={100}
          placeholder="水分"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Col>
  </Row>
);
