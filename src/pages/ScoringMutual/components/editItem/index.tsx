/*
 * @Author: lileichao
 * @Date: 2022-11-08 15:28:18
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 18:11:47
 * @Description: file content
 * @Copyright: 深圳妙创医学有限公司2021
 */
import React, { useState, useEffect } from 'react';

import { EllipsisOutlined } from '@ant-design/icons';
import { Select, Modal, Form, Input, Row, Col, InputNumber, Upload, Button } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

export const SelectVoice: React.FC<{
  value?: any;
  onChange?: (value: any) => void;
  onIsModal: (type: {
    bool: boolean;
    modalTitle: string;
    modalType: 0 | 1 | 2;
    formData?: {
      name: string;
    };
  }) => void;
}> = ({ value, onChange, onIsModal }) => {
  useEffect(() => {
    console.log('执行');
  }, []);
  const [form] = Form.useForm();
  console.log('value', value);
  const [opne, setIsOpen] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>('');
  const onSearch = (values: string) => {
    setKeyWord(values);
  };
  const SeleonChange = (values: string) => {
    onChange?.(values);
  };
  const KeyDowChange = (e) => {
    if (e.keyCode === 13) {
      if (typeof value === 'undefined' || keyWord) {
        console.log('执行');
        onChange?.('');
        setIsOpen(true);
        onIsModal({
          bool: true,
          modalTitle: '新增语音',
          modalType: 2,
          formData: {
            name: keyWord,
          },
        });
        form.setFieldValue('name', keyWord);
      }
    }
  };

  return (
    <>
      <Select
        value={value ?? ''}
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={SeleonChange}
        onSearch={onSearch}
        onInputKeyDown={KeyDowChange}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: 'jack',
            label: 'jack',
          },
          {
            value: 'lucy',
            label: 'lucy',
          },
          {
            value: 'tom',
            label: 'tom',
          },
        ]}
      />
    </>
  );
};

export const UploadPreview: React.FC<{
  value?: UploadFile[];
  onChange?: (value: any) => void;
}> = ({ value, onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [expand, setExpand] = useState<boolean>(false); // 展示所有图片
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url as string);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const onRemove = (file: UploadFile) => {
    const newValue = value?.filter((item) => item.uid !== file.uid);
    console.log('newValue', newValue);
    onChange?.(newValue);
  };
  const onExpand = () => {
    setExpand(true);
  };
  useEffect(() => {
    if (value?.length > 3 && !expand) {
      const newFileList = [];
      for (let i = 0; i < 3; i++) {
        newFileList.push(value?.[i]);
      }
      setFileList(newFileList);
    } else if (value?.length <= 3 || expand) {
      setFileList(value ?? []);
    } else {
      setFileList([]);
    }
  }, [value, expand]);
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={onRemove}
      >
        {null}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      {value?.length > 3 && !expand ? (
        <div
          onClick={onExpand}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <span>
            <i style={{ fontSize: 20 }}>......</i>
          </span>
        </div>
      ) : null}
    </>
  );
};

export const MeucanUpload: React.FC<{
  value?: any;
  onChange?: (value: any) => void;
}> = ({ value, onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const { file } = info;
    if (file.status === 'done') {
      onChange?.(file.response);
      setFileList(info.fileList);
    }
  };
  return (
    <Upload
      fileList={fileList}
      listType="picture-card"
      accept="image/*"
      action="/virtual/course/save_file"
      onChange={handleChange}
    >
      {/* {fileList.length > 3 ? null : <div>上传封面图</div>} */}
      {
        <Button disabled={fileList.length > 3 ? true : false} style={{ width: 100 }}>
          选取图片
        </Button>
      }
    </Upload>
  );
};

/* 
  
   const onOk = async () => {
    try {
      const res = await form.validateFields();
      console.log('res', res);
      setIsOpen(false);
      form.resetFields();
    } catch (error) {}
  };
  
   <Modal
        title="新增语音"
        open={opne}
        onOk={onOk}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
        }}
      >
        <div style={{ padding: 30 }}>
          <Form form={form}>
            <Form.Item
              label="语音文本"
              name="name"
              wrapperCol={{ span: 17 }}
              labelCol={{ span: 5 }}
              // required={[{ }]}
              rules={[{ required: true, message: '语音文本为必填' }]}
            >
              <Input />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="spd（语速）" name="spd">
                  <InputNumber {...defunctInputNumber} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="pit（音调）" name="pid">
                  <InputNumber {...defunctInputNumber} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="vol（音量）" name="vol">
                  <InputNumber {...defunctInputNumber} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="per（人声）" name="per">
                  <InputNumber {...defunctInputNumber} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
  
  */
