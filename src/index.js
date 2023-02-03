import './console';
import dayjs from 'dayjs';
import store from '@store';
import Router from './Router';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';

import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import 'dayjs/locale/zh-cn';
import '@assets/style';

dayjs.locale('zh-cn'); // 时区设置

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ConfigProvider>,
);
