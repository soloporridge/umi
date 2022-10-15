import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import { Prompt } from 'umi';
const { confirm } = Modal;
const App = () => {
  const history = useHistory();
  const [isPrompt, setIsPrompt] = useState(true);
  const [pathName, setPathName] = useState('');
  useEffect(() => {
    if (pathName) {
      history.push(pathName);
    }
  }, [pathName]);
  return (
    <div>
      <Prompt
        when={isPrompt}
        message={(local: any, action) => {
          console.log(action);
          if (!isPrompt) return true;
          confirm({
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
            content: '当前信息未保存，离开页面将会放弃所有修改数据',
            onOk() {
              // callback(true);
              // setIsPrompt(false);
              // history.push(local.pathname);
              // return true;
              setPathName(local.pathname);
              setIsPrompt(false);
            },
            onCancel() {
              // callback(false);
            },
          });
          if (isPrompt) return false;
        }}
      />
      <Button
        onClick={() => {
          setIsPrompt(false);
        }}
      >
        保存数据
      </Button>
    </div>
  );
};

export default App;
