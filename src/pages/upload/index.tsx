import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal, Upload, Image } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const cli = (indexs) => {
    const current = fileList.filter((item, index) => {
      return indexs !== index;
    });
    setFileList(current);
  };
  return (
    <>
      <Upload
        action="/upload.do"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={false}
        multiple // 支持多张上传
      >
        {/* {fileList.length >= 3 ? null : uploadButton} */}
        {uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <div style={{ width: 500, display: 'flex', justifyContent: 'space-between' }}>
        {fileList.map((item, index) => {
          return (
            <div key={item.url} style={{ position: 'relative' }}>
              <CloseOutlined
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 999,
                  fontSize: 18,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  cli(index);
                }}
              />
              <Image src={item.url} width={100} preview={false} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
