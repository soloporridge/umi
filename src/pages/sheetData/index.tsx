import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { delteW } from './test';
const data = {
  sheetName: {
    '!margins': {},
    '!ref': 'A1:A25',
    A1: {
      t: 's',
      v: '表头',
    },
    A2: {
      t: 's',
      v: '芜湖',
    },
    A3: {
      t: 's',
      v: '起飞',
    },
    A4: {
      t: 's',
      v: '哇哇哇哇哇',
    },
    A6: {
      t: 's',
      v: '也一样',
    },
    A7: {
      t: 's',
      v: 'A7',
    },
  },
};
const Sheet = () => {
  const [sheetData, setSheetData] = useState<any>(data);
  const [sheetKeys, setSheetKeys] = useState<any>(Object.keys(data.sheetName));
  const [deletKeys, setDeletKeys] = useState<any>([]);
  const delet = (rowKey: string) => {
    const indexs = sheetKeys.indexOf(rowKey);
    console.log('indexs', indexs);
    setDeletKeys((state: any) => [...state, rowKey]);
  };
  const onMap = () => {
    delteW(sheetKeys, deletKeys, sheetData);
  };

  return (
    <div>
      <Button onClick={() => delet('A2')}>删除A2</Button>
      <Button onClick={() => delet('A5')}>删除A5</Button>
      <Button onClick={() => onMap()}>遍历</Button>
    </div>
  );
};
export default Sheet;

/* 
第一版
const delet = (row: string) => {
    const rs = Number(row.replace('A', '')) + 1;
    const sheetKey = Object.keys(sheetData.sheetName);
    const detIndex = sheetKey.indexOf('A' + rs);
    console.log('detIndex-------', detIndex);

    const res = {};
    sheetKey.forEach((item, index) => {
      if (item !== 'A' + rs) {
        if (index > detIndex) {
          const r = Number(item.replace('A', '')) - 1;
          res['A' + r] = sheetData.sheetName[item];
        } else {
          res[item] = sheetData.sheetName[item];
        }
      }
    });
    setSheetData(res);
    console.log('sheetData', sheetData);
    console.log('res', res);
    console.log('sheetKey', sheetKey);
    console.log('detIndex', detIndex);
  };

*/
