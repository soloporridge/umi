import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { Button, message, Upload } from 'antd';
import { request } from 'umi';
import reqwest from 'reqwest';
const jiex = (file) => {
  console.log('------fileJiex', file);
  const files = file;
  const fileReader = new FileReader();
  fileReader.readAsBinaryString(files);
  fileReader.onload = (event) => {
    try {
      const { result } = event.target;
      // 以二进制流方式读取得到整份excel表格对象
      const workbook = XLSX.read(result, { type: 'binary' });
      console.log('workbook.Sheets', workbook.Sheets);
      // 表名字
      console.log('workbook.SheetNames', workbook.SheetNames);

      // 存储获取到的数据
      let data: any = [];

      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      for (const sheet in workbook.Sheets) {
        // esline-disable-next-line
        console.log('workbook.Sheets.sheet', workbook.Sheets[sheet]);

        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      // 最终获取到并且格式化后的 json 数据
      message.success('文件解析成功！');
      console.log('data二次解析', data);
    } catch (error) {
      console.log(error);
    }
  };
};

const Excle = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [excelData, setExcelData] = useState<any>([]);
  const [pres, setPres] = useState([]);
  const [Yuan, setYuan] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const f = await (await fetch('https://sheetjs.com/pres.xlsx')).arrayBuffer();
      const wb = XLSX.read(f); // parse the array buffer
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
      const data = XLSX.utils.sheet_to_json(ws); // generate objects
      setPres(data); // update state
    })();
  }, []);
  const f = (file) => {
    const formData = new FormData();
    formData.append('wuhu', new Blob([JSON.stringify(file)]));
    formData.forEach((item) => {
      console.log('---二次解析', item);
      jiex(item);
    });
    reqwest({
      url: '/upload.do',
      method: 'post',
      data: formData,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return true;
  };
  /* get state data and export to XLSX */
  useEffect(() => {
    if (pres.length) {
      console.log('pres', excelData);

      // json 转表格
      const jsons = XLSX.utils.sheet_to_json(Yuan);
      console.log('jsons', jsons);

      const ws = XLSX.utils.json_to_sheet(jsons);
      // 创建一个新的表
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
      // 表文件类型
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
      // XLSX.writeFileXLSX(wb, 'SheetJSReactAoO.xlsx');
      // 输出结果
      const res = XLSX.write(wb, wopts);
      // console.log('res', res);
      f(res);
      // jiex(res);
    }
  }, [excelData]);

  const onImportExcel = (file: any) => {
    // console.log('执行');
    const files = file;
    const fileReader = new FileReader();
    console.log('------file第一次', file);

    fileReader.readAsBinaryString(files);
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        console.log('workbook.Sheets', workbook.Sheets);
        setYuan(workbook.Sheets);
        // 表名字
        console.log('workbook.SheetNames', workbook.SheetNames);

        // 存储获取到的数据
        let data: any = [];

        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
          console.log('workbook.Sheets.sheet', workbook.Sheets[sheet]);

          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        // 最终获取到并且格式化后的 json 数据
        message.success('文件解析成功！');
        console.log(data);

        setExcelData(data);
        // 转表格
        const sheet = XLSX.utils.json_to_sheet(data);
        const name = workbook.SheetNames[0];
        const workbooks = { [name]: sheet };
        console.log('sheet', workbooks);

        // 转回二进制
        const formData = new FormData();
        formData.append(
          'Blob',
          new Blob([JSON.stringify(workbook.Sheets[workbook.SheetNames[0]])]),
        );
        // jiex(formData);
      } catch (error) {
        console.log(error);
      }
    };
  };
  return (
    <div>
      <Upload
        action="/upload.do"
        beforeUpload={(file) => {
          onImportExcel(file);
          // f(file);
          // setFileList([file]);
          return true;
        }}
        onChange={(file) => {
          // console.log('file', file);
        }}
        fileList={fileList}
      >
        <Button>上传</Button>
      </Upload>
      <Upload
        customRequest={(file) => {
          f(file);
          return true;
        }}
        beforeUpload={(file) => {
          console.log('上传浅----', file);
        }}
      >
        {' '}
        <Button>上传2</Button>
      </Upload>
    </div>
  );
};

export default Excle;
