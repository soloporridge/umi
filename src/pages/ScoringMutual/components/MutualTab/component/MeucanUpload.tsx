/*
 * @Author: lileichao
 * @Date: 2022-11-25 15:21:11
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 18:22:42
 * @Description: 图片上传
 * @Copyright: 深圳妙创医学有限公司2021
 */
import React, { useState } from 'react';
import { Upload, Button } from 'antd';

import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
const MeucanUpload: React.FC<{
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
    <>
      <Upload
        fileList={fileList}
        listType="text"
        accept="image/*"
        action="/virtual/course/save_file"
        onChange={handleChange}
      >
        {/* {fileList.length > 3 ? null : <div>上传封面图</div>} */}
        {<Button style={{ width: 200 }}>选取图片</Button>}
      </Upload>
      <Button disabled={fileList.length ? false : true} style={{ width: 200, marginTop: 20 }}>
        开始上传
      </Button>
    </>
  );
};

export default MeucanUpload;
