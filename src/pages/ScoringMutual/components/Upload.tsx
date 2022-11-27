/*
 * @Author: lileichao
 * @Date: 2022-11-08 10:50:17
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 15:01:19
 * @Description: 封面图上传
 * @Copyright: 深圳妙创医学有限公司2021
 */
import { useState, useEffect } from 'react';
import { Upload as AntdUpload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
const Upload: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
}> = ({ value, onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: '-xxx',
          name: '封面图',
          url: value,
        },
      ]);
    }
  }, [value]);
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const { file } = info;
    if (file.status === 'done') {
      onChange?.(file.response);
      setFileList(info.fileList);
    }
  };
  return (
    <AntdUpload
      fileList={fileList}
      listType="picture-card"
      accept="image/*"
      action="/virtual/course/save_file"
      onChange={handleChange}
    >
      {fileList.length ? null : <div>上传封面图</div>}
    </AntdUpload>
  );
};

export default Upload;
