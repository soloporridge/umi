import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Form, Button } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
type AppProps = {
  onChange?: (value: string) => void;
};

const App: React.FC<AppProps> = (props) => {
  const { onChange } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    console.log(file);
    if (file.status) {
      onChange?.(file);
      // console.log(onChange);
    }

    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action="/upload.do"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

const Forms = () => {
  const [form] = Form.useForm();
  const onChange = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <Form
        form={form}
        onFinish={(value) => {
          console.log(value);
        }}
      >
        <Form.Item
          label="上传图片"
          name="img"
          rules={[
            {
              required: true,
              message: '上传图片',
            },
          ]}
        >
          <App onChange={onChange} />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        htmlType="submit"
        onClick={async () => {
          console.log(form.getFieldsValue());
          console.log(1);
          try {
            console.log(2);
            const res = await form.validateFields(); // 触发校验规则
            console.log(3);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        提交表单
      </Button>
    </>
  );
};

export default Forms;
