import { useEffect } from 'react';
// import Preview from '@kunlunxu/brick/es/markdown/Preview';

export default () => {
  // const [answers, setAnswers]  = useState([]);

  useEffect(() => {
    // 通过 new EventSource 开启 SSE
    // const source = new EventSource('http://127.0.0.1:4000/demo?message=JS Map 类型');

    // source.addEventListener('open', () => {
    //   console.log('建立连接');
    // });

    // source.addEventListener('error', (err) => {
    //   console.log('连接出错:', err);
    //   source.close();
    // });

    // source.addEventListener('message', (event) => {
    //   // 结束则关闭链接
    //   if (event.data.trim() === '[DONE]') {
    //     source.close();
    //   }

    //   setAnswers((pre) => [...pre, event.data || '']);
    // });
  }, []);

  // const data = `答复: ${answers.join('')}`;

  return (
    <div>
      {/* <Preview>
        {data}
      </Preview> */}
    </div>
  );
};
