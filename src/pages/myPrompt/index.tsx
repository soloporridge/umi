import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import { Prompt } from 'umi';

const { confirm } = Modal;

const MyPrompt = () => {
  const history = useHistory();
  const [isPrompt, setIsPrompt] = useState(true);
  const [pathName, setPathName] = useState('');
  useEffect(() => {
    if (pathName) {
      history.push(pathName);
    }
  }, [pathName]);
  const beforeunload = (ev) => {
    console.log(ev);
    if (ev) {
      ev.returnValue = '123123';
    }
  };
  useEffect(() => {
    // 页面刷新时触发
    window.addEventListener('beforeunload', beforeunload);
    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    };
  }, []);

  return (
    <>
      <Prompt
        when={isPrompt}
        message={(local: any) => {
          confirm({
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
            content: '当前信息未保存，离开页面将会放弃所有修改数据',
            onOk() {
              setPathName(local.pathname);
              setIsPrompt(false);
            },
            // onCancel() {
            //   // callback(false);
            // },
          });
          // if (!isPrompt) return true; // 返回true表示离开false则相反
          // if (isPrompt) return false;
          return isPrompt ? false : true;
        }}
      />
      <Button
        onClick={() => {
          setIsPrompt(false);
        }}
      >
        保存数据
      </Button>
    </>
  );
};
export default MyPrompt;
