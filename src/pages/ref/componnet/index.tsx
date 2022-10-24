import React, { Form, Input } from 'antd';
const MyForm = ({ refs }) => {
  return (
    <>
      <Form ref={refs}>
        <Form.Item name="inp">
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default MyForm;
