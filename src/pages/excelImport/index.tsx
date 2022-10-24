/*
 * @Author: lileichao
 * @Date: 2022-10-14 13:44:44
 * @LastEditors: lileichao
 * @LastEditTime: 2022-10-24 15:17:09
 * @Description: 表格上传校验
 * @Copyright: 深圳妙创医学有限公司2021
 */
import reqwest from 'reqwest';
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, Upload, message, Modal } from 'antd';
import type { WritingOptions } from 'xlsx';
type Data = {
  cell: string;
  id: number;
  msg: string;
  row: string | null;
  rowList: number[];
  value?: string;
  type?: string;
};

interface ExcelImportProps {
  token?: string; // 如果不传token默认去localStorg中取
}

//字符串转字符流
function s2ab(s: any) {
  if (typeof ArrayBuffer !== 'undefined') {
    //1、创建一个字节长度为s.length的内存区域
    const buf = new ArrayBuffer(s.length);
    //2、创建一个指向buf的Unit8视图，开始于0字节，直到缓冲区的末尾
    const view = new Uint8Array(buf);
    //3、返回指定位置的字符的Unicode编码
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    const buf = new Array(s.length);
    for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
}

const ExcelImport: React.FC<ExcelImportProps> = ({ token }) => {
  const [sheet, setSheet] = useState<any>(); // 表格格式对象
  const [sheetName, setSheetname] = useState<string>(''); // 表名
  const [isOpen, setIsOpen] = useState<boolean>(false); // 弹框
  const [errorData, setErrorData] = useState<Data[]>([]); //后端返回报错行
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]); // 编辑行的key
  const [tabDataSource, setTabDataSource] = useState<Data[]>([]); // 表格数据
  const [sheetKeys, setSheetKeys] = useState<string[]>([]); // 表格对象的所有key
  useEffect(() => {
    if (errorData.length) {
      const tabData: any = [];
      const keys: string[] = [];
      errorData.forEach((item) => {
        if (item.row) {
          if (!sheet[sheetName].hasOwnProperty(item.cell + item.row)) {
            keys.push(item.cell + item.row);
          }
          tabData.push({
            ...item,
            value: sheet[sheetName][item.cell + item.row]?.v,
            id: tabData.length,
          });
        } else {
          item.rowList.forEach((row) => {
            if (!sheet[sheetName].hasOwnProperty(item.cell + row)) {
              keys.push(item.cell + row);
            }
            tabData.push({
              ...item,
              row,
              id: tabData.length,
              value: sheet[sheetName][item.cell + row]?.v,
            });
          });
        }
      });
      setSheetKeys((state) => [...state, ...keys]);
      setTabDataSource(tabData);
    }
  }, [errorData]);
  useEffect(() => {
    setEditableRowKeys(tabDataSource.map((item) => item.id));
  }, [tabDataSource]);

  // 读取表格数据
  const onImportExcel = (file: any) => {
    const files = file;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(files);
    fileReader.onload = (event: any) => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' }); // 读取表格 返回值是对象
        setSheet(workbook.Sheets);
        /* 读取表名 */
        const name = workbook.SheetNames[0];
        setSheetname(name);
        setSheetKeys(Object.keys(workbook.Sheets[name]));
        let data: any = [];
        /* 读取到的对象转数组 */
        for (const Sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(Sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[Sheet]));
          }
        }
      } catch (error) {
        console.log('读取失败请检查文件');
      }
    };
  };
  // 请求
  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await reqwest({
      url: '/basic/course/import_excel',
      method: 'post',
      processData: false,
      data: formData,
      headers: {
        'x-api-token': token ?? localStorage.getItem('cache-api-token'),
      },
    });
    if (res.error.length) {
      setErrorData(res.error);
      setIsOpen(true);
    } else {
      message.success('上传成功');
      setIsOpen(false);
    }
  };
  const onBeforeUpload = (file: any) => {
    onImportExcel(file);
    uploadFile(file);
  };
  /* 删除 */
  const onDelet = (sheepRow: Data) => {
    const { row, cell, id } = sheepRow;
    const deletTabData = tabDataSource.filter((item) => item.id !== id);
    const deletTabKeys = sheetKeys.filter((item) => item != cell + row);
    setSheetKeys(deletTabKeys);
    setTabDataSource(deletTabData);
  };
  // 提交
  /* 后端只读取第一列 所以目前A是写死的 */
  const onSubmit = () => {
    const K = sheetKeys
      .filter((item) => !item.indexOf('A'))
      .sort((a, b) => Number(a.replace('A', '')) - Number(b.replace('A', '')));
    const res1 = {};
    K.forEach((item, index) => {
      if (sheet[sheetName][item]?.v) {
        res1['A' + (index + 1)] = sheet[sheetName][item];
      }
    });
    res1['!ref'] = sheet[sheetName]['!ref'];
    res1['!margins'] = sheet[sheetName]['!margins'];
    const wopts: WritingOptions = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    };

    const wbs = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbs, res1, 'Data');
    const res = XLSX.write(wbs, wopts);

    const tmpDown = new Blob([s2ab(res)]);
    onBeforeUpload(tmpDown);
    setErrorData([]);
    setEditableRowKeys([]);
    setTabDataSource([]);
    setSheetKeys([]);
  };
  const columns = [
    {
      title: '行',
      dataIndex: 'row',
      width: '5%',
      editable: () => {
        return false;
      },
      render: (_: any, row: Data) => {
        return row.row ? (
          <div>{row.row}</div>
        ) : (
          <div>
            {row.rowList.map((item) => {
              return <span key={item}>{item}&nbsp;</span>;
            })}
          </div>
        );
      },
    },
    {
      title: '列',
      width: '5%',
      editable: () => {
        return false;
      },
      render: (_: any, row: Data) => {
        return <span>{row.cell + row.row}</span>;
      },
    },
    {
      title: '错误信息',
      dataIndex: 'msg',
      editable: () => {
        return false;
      },
    },
    {
      title: '数据',
      key: 'value',
      dataIndex: 'value',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      width: '8%',
      editable: () => {
        return false;
      },
      render: (_: any, row: Data) => {
        return (
          <Button
            type="link"
            onClick={() => {
              onDelet(row);
            }}
          >
            删除
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Upload
        customRequest={(options: any) => {
          onBeforeUpload(options.file);
        }}
        fileList={[]}
        capture={undefined}
      >
        <Button type="primary">Excel上传</Button>
      </Upload>
      <Modal
        open={isOpen}
        width={1200}
        onCancel={() => {
          setIsOpen(false);
          setErrorData([]);
          setEditableRowKeys([]);
          setTabDataSource([]);
          setSheetKeys([]);
        }}
        footer={
          <Button type="primary" onClick={onSubmit}>
            再次提交
          </Button>
        }
      >
        <EditableProTable
          headerTitle="错误数据列表"
          columns={columns}
          rowKey="id"
          value={tabDataSource}
          recordCreatorProps={false} // 不显示新增一行按钮
          pagination={{ pageSize: 2 }}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
              const { cell, row, value } = record;
              setSheet((state) => {
                return {
                  [sheetName]: {
                    ...state[sheetName],
                    [cell + row]: { t: 's', v: value },
                  },
                };
              });
              setTabDataSource(recordList);
            },
            onChange: setEditableRowKeys,
          }}
        />
      </Modal>
    </>
  );
};

export default ExcelImport;
