import { Button } from 'antd';
import { useState, useEffect } from 'react';
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
  },
};
const Sheet = () => {
  const [sheetData, setSheetData] = useState<any>(data);
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
  useEffect(() => {
    console.log('表格变化后', sheetData);
  }, [sheetData]);
  return (
    <div>
      <Button onClick={() => delet('A1')}>删除</Button>
    </div>
  );
};
export default Sheet;
