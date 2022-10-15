import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useState } from 'react';

const treeData: DataNode[] = [
  {
    title: '0-01111111111111111111',
    key: '0-0',
    parentKey: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        parentKey: '0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
            parentKey: '0-0',
            children: [{ title: '0-0-0-0-0', key: '0-0-0-0-0', parentKey: '0-0', data: [] }],
          },
          { title: '0-0-0-1', key: '0-0-0-1', parentKey: '0-0' },
          { title: '0-0-0-2', key: '0-0-0-2', parentKey: '0-0' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        parentKey: '0-0',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0', parentKey: '0-0' },
          { title: '0-0-1-1', key: '0-0-1-1', parentKey: '0-0' },
          { title: '0-0-1-2', key: '0-0-1-2', parentKey: '0-0' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        parentKey: '0-0',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    parentKey: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', parentKey: '0-1' },
      { title: '0-1-0-1', key: '0-1-0-1', parentKey: '0-1' },
      { title: '0-1-0-2', key: '0-1-0-2', parentKey: '0-1' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
    parentKey: '0-2',
  },
];

const treeData2: DataNode[] = [
  {
    title: '0-01111111111111111111',
    key: '0-0',
    parentKey: '0-0',
    children: [
      {
        title: '0-0-0',
        key: 'ww',
        parentKey: '0-0',
        children: [
          {
            title: '0-0-0-0',
            key: 'zzz',
            parentKey: '0-0',
            children: [{ title: '0-0-0-0-0', key: '33', parentKey: '0-0', data: [] }],
          },
          { title: '0-0-0-1', key: 'qwe', parentKey: '0-0' },
          { title: '0-0-0-2', key: 'zxc', parentKey: '0-0' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        parentKey: '0-0',
        children: [
          { title: '0-0-1-0', key: 'gg', parentKey: '0-0' },
          { title: '0-0-1-1', key: 'yy', parentKey: '0-0' },
          { title: '0-0-1-2', key: 'mm', parentKey: '0-0' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        parentKey: '0-0',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    parentKey: '0-1',
    children: [
      { title: '0-1-0-0', key: 'uu', parentKey: '0-1' },
      { title: '0-1-0-1', key: 'pp', parentKey: '0-1' },
      { title: '0-1-0-2', key: 'll', parentKey: '0-1' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
    parentKey: '0-2',
  },
];

const wuhu = [
  {
    classifyList: [],
    id: 1118,
    name: 'sadf',
    templateType: 0,
    fatherId: 0,
    templateList: [
      {
        id: 11,
        classifyId: 1118,
        type: 0,
        data: [
          {
            templateId: 11,
            sort: 0,
            text: 'asdf',
            type: 0,
          },
        ],
      },
    ],
  },
  {
    classifyList: [
      {
        classifyList: [
          {
            classifyList: [],
            id: 1121,
            name: '测试2.1.1',
            templateType: 0,
            fatherId: 1120,
            templateList: [
              {
                id: 12,
                classifyId: 1121,
                type: 0,
                data: [
                  {
                    templateId: 12,
                    sort: 0,
                    text: '史蒂夫',
                    type: 0,
                  },
                ],
              },
            ],
          },
        ],
        id: 1120,
        name: '测试2.1',
        templateType: 0,
        fatherId: 1119,
        templateList: [],
      },
    ],
    id: 1119,
    name: '测试2',
    templateType: 0,
    fatherId: 0,
    templateList: [],
  },
];
const wuhu2 = [
  {
    classifyList: [],
    id: 1118,
    name: 'sadf',
    templateType: 0,
    fatherId: 0,
    templateList: [
      {
        id: 11,
        classifyId: 1118,
        type: 0,
        data: [
          {
            templateId: 11,
            sort: 0,
            text: 'asdf',
            type: 0,
          },
        ],
      },
    ],
  },
  {
    classifyList: [
      {
        classifyList: [
          {
            classifyList: [],
            id: 1121,
            name: '测试2.1.1',
            templateType: 1,
            fatherId: 1120,
            templateList: [
              {
                id: 12,
                classifyId: 1121,
                type: 0,
                data: [
                  {
                    templateId: 12,
                    sort: 0,
                    text: '史蒂夫',
                    type: 0,
                  },
                ],
              },
              {
                id: 12,
                classifyId: 1121,
                type: 1,
                data: [
                  {
                    templateId: 12,
                    sort: 0,
                    text: 'wuuuu',
                    type: 0,
                  },
                ],
              },
            ],
          },
        ],
        id: 1120,
        name: '测试2.1',
        templateType: 0,
        fatherId: 1119,
        templateList: [],
      },
    ],
    id: 1119,
    name: '测试2',
    templateType: 0,
    fatherId: 0,
    templateList: [],
  },
  {
    classifyList: [],
    id: 1118,
    name: 'sadf',
    templateType: 0,
    fatherId: 0,
    templateList: [
      {
        id: 11,
        classifyId: 1118,
        type: 0,
        data: [
          {
            templateId: 11,
            sort: 0,
            text: 'asdf',
            type: 0,
          },
        ],
      },
    ],
  },
];

const queryData = (arr: any): boolean => {
  let flag: boolean = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classifyList.length) {
      flag = queryData(arr[i].classifyList);
    } else {
      if (arr[i].templateType > 0) {
        // if (arr[i].templateList.length < 2) {
        //   flag = false;
        // } else {
        //   flag = true;
        // }
        flag = arr[i].templateList.length < 2 ? false : true;
      } else if (arr[i].templateType === 0) {
        // if (arr[i].templateList.length === 0) {
        //   flag = false;
        // } else {
        //   flag = true;
        // }
        flag = arr[i].templateList.length === 0 ? false : true;
      }
    }
    console.log('------');

    if (!flag) break;
  }
  // console.log(flag);

  return flag;
};
console.log('arr--query', wuhu2);
console.log('返回结果', queryData(wuhu2));

const setWuhu = (arr) => {
  const terr = [];
  for (let i = 0; i < arr.length; i++) {
    const obj = {};
    if (arr[i]?.templateList?.length || arr[i]?.classifyList?.length) {
      obj.title = arr[i].name;
      obj.key = arr[i].id;
      obj.templateList = arr[i].templateList;
      obj.children = setWuhu(
        arr[i]?.templateLis?.length ? arr[i]?.templateList : arr[i]?.classifyList,
      );
      // obj.templateType = arr[i].templateList.length
      //   ? arr[i].templateType
      //   : !arr[i]?.templateLis?.length && !arr[i]?.classifyList?.length
      //   ? arr[i].templateType
      //   : -100;
      obj.hierarchy = arr[i].hierarchy;
      obj.keys = arr[i].keys;
      obj.templateType = arr[i].classifyList.length ? -1 : arr[i].templateType;
      terr.push(obj);
    } else {
      obj.title = arr[i].name;
      obj.key = arr[i].id;
      obj.keys = arr[i].keys;
      obj.templateList = arr[i].templateList;
      obj.templateType = arr[i].templateType;
      obj.hierarchy = arr[i].hierarchy;
      terr.push(obj);
    }
  }
  return terr;
};
// console.log('setWuhu', setWuhu(wuhu));

const setTemplateType = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children) {
      data[i].templateList = -100;
      setTemplateType(data[i].children);
    }
  }
  return data;
};
console.log('treeData----------', setTemplateType(treeData));

// 递归给每一层添加keys
const setTerrData = (arr, kk) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children?.length) {
      if (kk) {
        // console.log('kk---', kk);
        arr[i].keys = kk + '/' + arr[i].key;
        setTerrData(arr[i].children, arr[i].keys);
      } else {
        arr[i].keys = arr[i].key;
        setTerrData(arr[i].children, arr[i].key);
      }
      arr[i].hierarchy = arr[i].hierarchy ? arr[i].hierarchy + 1 : 1;
    } else {
      arr[i].keys = kk ? kk + '/' + arr[i].key : arr[i].key;
      arr[i].hierarchy = arr[i].hierarchy ? arr[i].hierarchy + 1 : 1;
    }
  }
  return arr;
};

/**
 *
 * @param arr
 * @param  types id子一级id  uoID上一级id  hierarchy 当前层级
 * @returns Array
 */
// console.log('setTerrData', setTerrData(treeData2, ''));
// 删除classifyList
const removeClassifyList = (arr, types: { id: number; upID: number; hierarchy: number }) => {
  for (let i = 0; i < arr.length; i++) {
    console.log('id', arr[i].id, 'upID', types.upID);

    if (arr[i].id === types.upID) {
      if (types.hierarchy === 0) {
        arr = arr.filter((item) => item.id !== types.id);
      } else {
        arr[i].classifyList = arr[i].classifyList.filter((item) => item.id !== types.id);
      }
    } else {
      removeClassifyList(arr[i].classifyList, types);
    }
  }
  return arr;
};

const A = (arr: any, childrenkey: string, parentKey: string, data?: [] | string) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentKey === parentKey) {
      if (arr[i].key === childrenkey) {
        // if (!arr[i].children?.length) {
        console.log(data);
        if (Array.isArray(data)) {
          // data 是数组修改数据的中data则修改title
          // console.log('结果修改data', (arr[i].data = data));
        } else {
          // console.log('结果修改title', (arr[i].data = [{ name: '找到' }]));
        }
        // }
      } else if (arr[i].children) {
        arr[i].templateList = -0;
        A(arr[i].children, childrenkey, parentKey, data);
      }
    }
  }
  return arr;
};

const B = (arr, keys) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classifyList.length) {
      if (keys) {
        arr[i].keys = keys + '/' + arr[i].id;
        B(arr[i].classifyList, arr[i].keys);
        arr[i].hierarchy = arr[i].keys.split('/').length - 1;
      } else {
        arr[i].keys = arr[i].id + '';
        arr[i].hierarchy = arr[i].keys.split('/').length - 1;
        B(arr[i].classifyList, arr[i].id);
      }
    } else {
      arr[i].keys = keys ? keys + '/' + arr[i].id : arr[i].id + '';
      arr[i].hierarchy = arr[i].keys.split('/').length - 1;
    }
  }
  return arr;
};

console.log('B-------', setWuhu(B(wuhu, '')));
// console.log('B-------', setWuhu(B(wuhu, '')));

// A(treeData, '0-0-0-0-0', '0-0');

const App: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['1', '1']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [move, setMove] = useState<any>({ clientX: 0, clinentY: 0 }); // dvi 移动位置
  const [isDiv, setIsDiv] = useState<boolean>(false);
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    const { nativeEvent, selectedNodes, node } = info;
    console.log('onSelect', node);
    const { keys, key, hierarchy } = node;
    setSelectedKeys(selectedKeysValue);
    if (selectedNodes.length) {
      setIsDiv(true);
    } else {
      setIsDiv(false);
    }
    setMove({ clientX: nativeEvent.x, clinentY: nativeEvent.y - 50 - 28 });
    // console.log(A(treeData, node.key, node.parentKey, 'wuhu'));
    console.log('-/', keys.split('/')[hierarchy === 0 ? hierarchy : hierarchy - 1]);
    console.log(
      '删除完',
      removeClassifyList(wuhu2, {
        id: key,
        upID: Number(keys.split('/')[hierarchy === 0 ? hierarchy : hierarchy - 1]),
        hierarchy,
      }),
    );
  };

  return (
    <>
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={setWuhu(B(wuhu, ''))}
        onRightClick={({ event, node }) => {
          const { keys, key, hierarchy } = node;
          console.log(keys, key, hierarchy);
        }}
      />
      {/* {isDiv && (
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'black',
            position: 'absolute',
            left: move.clientX,
            top: move.clinentY,
          }}
        >
          123
        </div>
      )} */}
    </>
  );
};

export default App;
