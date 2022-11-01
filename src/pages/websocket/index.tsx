import { Button } from 'antd';
import { useEffect } from 'react';
import useWebsocket from './websocket';
const Websocket = () => {
  const { wsData, ws, readyState, closeWebSocket, reconnect, sendMessage } = useWebsocket({
    url: 'ws://127.0.0.1:5000', // 此参数为websocket地址
  });
  useEffect(() => {
    console.log('wsData', wsData);
  }, [wsData]);
  return (
    <div>
      <Button
        onClick={() => {
          console.log('发生数据');
          sendMessage(JSON.stringify({ msg: 'hello' }));
        }}
      >
        发送数据
      </Button>
      <Button
        onClick={() => {
          console.log('断开连接');

          closeWebSocket();
        }}
      >
        断开连接
      </Button>
      <Button
        onClick={() => {
          console.log('重新连接');

          reconnect();
        }}
      >
        重新连接
      </Button>
      <Button
        onClick={() => {
          console.log('当前状态', readyState);
        }}
      >
        查看当前状态
      </Button>
    </div>
  );
};

export default Websocket;
