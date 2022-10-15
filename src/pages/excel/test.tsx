import XLSX from 'xlsx';
function changeData(s) {
  //如果存在ArrayBuffer对象(es6)最好采用该对象
  if (typeof ArrayBuffer !== 'undefined') {
    //1.创建一个字节长度为s.length的内存区域
    let buf = new ArrayBuffer(s.length);
    //2.创建一个指向buf的Unit8视图，开始于字节0,直到缓冲区的末尾
    let view = new Uint8Array(buf);
    //3.返回指定位置的字符的Unicode编码
    for (let i = 0; i != s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  } else {
    let buf = new Array(s.length);
    for (let i = 0; i != s.length; ++i) {
      buf[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
}
function saveAs(obj, fileName) {
  let tmpa = document.createElement('a');
  tmpa.download = fileName ? fileName + '.xlsx' : new Date().getTime() + '.xlsx';
  tmpa.href = URL.createObjectURL(obj);
  tmpa.click();
  setTimeout(function () {
    URL.revokeObjectURL(obj);
  }, 100);
}
export function json2Excel(data, header, headerName, fileName) {
  //header为数据源属性名，headerName为属性名对应excel表头名称
  let wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  };
  let workBook = {
    SheetNames: ['Sheet1'],
    Sheets: {},
    Props: {},
  };
  const newData = [headerName, ...data];
  // 1.XLSX.utils.json_to_sheet(data)接受一个对象数组并返回一个基于对象关键字自动生成的“标题”的工作表
  //默认的列顺序由使用Object.keys的字段的第一次出现确定
  // 2.将数据放入对象workBook的Sheets中等待输出
  //加了一句skipHeader:true，这样就会忽略原来的表头
  workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(newData, {
    header: header,
    skipHeader: true,
  });
  // 3.XLSX.write()开始编写Excel表格
  // 4.changeData()将数据处理成需要的输出的格式
  saveAs(
    new Blob([changeData(XLSX.write(workBook, wopts))], { type: 'application/octet-stream' }),
    fileName,
  );
}
