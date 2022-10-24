import { useRef } from 'react';
import { Button, Form } from 'antd';
import type { FormInstance } from 'antd';
import MyForm from './componnet';
const Refs = () => {
  const formRef = useRef<FormInstance>();
  const [form] = Form.useForm();
  return (
    <div>
      <MyForm refs={formRef} />
      <Button
        onClick={() => {
          console.log(formRef.current?.getFieldsValue());
        }}
      >
        获取ref
      </Button>
    </div>
  );
};

export default Refs;
