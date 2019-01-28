export * from './tag';
import moment from 'moment';

// 处理 columns 函数
export default (columns = []) => (append = []) => {
  columns.forEach((value, key) => {
    switch(value.type){
      case 'Date':
        value.render = (text, record, index) => (
          text ? moment(text).format('YYYY-MM-DD') : '未知时间'
        );
        break;
      case 'Status':
        value.render = (text, record, index) =>(
          text ? value.desc[text] : '未知状态'
        );
        break;
      default:
        value.render = (text, record, index) => (text || '未定义值');
        break;
    }
    return value;
  });
  append.forEach((value, key) => {
    columns.push(value);
  });
} 
