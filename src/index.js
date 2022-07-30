import './console';
import store from '@store';
import moment from 'moment';
import Router from './Router';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';

import 'moment/locale/zh-cn';
import '@assets/style';

moment.locale('zh-cn'); // 时区设置

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ConfigProvider>,
);
