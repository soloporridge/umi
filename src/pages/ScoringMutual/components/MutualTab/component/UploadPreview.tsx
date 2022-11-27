/*
 * @Author: lileichao
 * @Date: 2022-11-25 11:36:52
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 15:02:38
 * @Description: file content
 * @Copyright: 深圳妙创医学有限公司2021
 */

import { Modal, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

const UploadPreview: React.FC<{
  fileList: UploadFile[];
}> = ({ fileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url as string);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  return (
    <>
      <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview}>
        {null}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadPreview;
