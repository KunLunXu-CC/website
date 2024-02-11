import { FC, ReactNode } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';

// `hashPriority` 默认为 `low`，配置为 `high` 后，
// 会移除 `:where` 选择器封装
const Antd: FC<{ children: ReactNode }> =  ({ children }) => (
  <StyleProvider hashPriority="antd-kunlunxu">
    {children}
  </StyleProvider>
);

export default Antd;
