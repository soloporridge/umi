export const delteW = (arr: any[], key: any, sheet: any) => {
  console.log('arr', arr);
  console.log('key', key);
  console.log('sheet', sheet);
  // delete sheet.sheetName['!margins'];
  // delete sheet.sheetName['!ref'];
  arr = arr.slice(2);
  const res = {};
  let asy: any = [];
  key.forEach((item) => {
    // if (arr.includes(item)) {
    asy = arr.filter((keys) => keys !== item);
    // }
  });
  console.log('遍历结束', asy);
  asy.forEach((item, index) => {
    if (sheet.sheetName.hasOwnProperty(item)) {
      res['A' + (index + 1)] = sheet.sheetName[item];
    }
  });
  console.log('res', res);
};
