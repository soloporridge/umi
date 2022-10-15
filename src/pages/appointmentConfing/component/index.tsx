import { Popconfirm } from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import type { ProColumns } from '@ant-design/pro-components';
/**
 * https://github.com/ai/nanoid/blob/HEAD/README.zh-CN.md
 */
const nanoid = customAlphabet('1234567890', 3);

const timestamp = (time: number) => {
  return new Date(time).toLocaleDateString().slice().replace(/\//g, '-');
};
const weebk = ['周一、', '周二、', '周三、', '周四、', '周五、', '周六、', '周日、'];
type operational = {
  key: number;
  data: any;
  row: any;
};
interface TabProps {
  setTab: { rowKey: string; headerTitle: string };
  dataSource: any[]; // 表格数据
  operationalDdata: (
    value: { rowKey: number; data: any; row?: any }, // row 只有在保存时才有
    type: 'save' | 'delet',
  ) => void; // 保存 删除时触发
  customClumns?: ProColumns[]; // 自定义Cloumns
  setDefaultClumns?: {
    startTime?: ProColumns;
    endTime?: ProColumns;
    type?: ProColumns;
    date?: ProColumns;
    operation?: ProColumns;
  }; // 修改默认的Cloumns
  pushDefaultClumns?: ProColumns[]; // 在默认Cloumns中追加
  editableType: 'single' | 'multiple'; // 选择编辑单行好是多行
}
/* 

  {
      title: '日期区间',
      key: 'createdAtRange',
      dataIndex: 'createdAtRange',
      valueType: 'dateRange',
      render: (_, row) => {
        console.log('row.createdAtRange', row.createdAtRange);
        // return (
        //   <div>{`${timestamp(row.createdAtRange[0])}  至  ${timestamp(
        //     row.createdAtRange[1],
        //   )}`}</div>
        // );
      },
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
*/

const AppointmentConfing: React.FC<TabProps> = (props) => {
  const { dataSource, operationalDdata, editableType, setTab } = props;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns[] = [
    {
      title: '开始时间',
      key: 'startTime',
      dataIndex: 'startTime',
      valueType: 'time',
      ...props.setDefaultClumns?.startTime,
    },
    {
      title: '结束时间',
      key: 'endTime',
      dataIndex: 'endTime',
      valueType: 'time',
      ...props.setDefaultClumns?.endTime,
    },
    {
      title: '可预约类型',
      key: 'type',
      dataIndex: 'type',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        课堂: {
          text: '课堂',
          status: 'Error',
        },
        训练: {
          text: '训练',
          status: 'Success',
        },
      },
      render: (_, row) => {
        return <div>{row.type === '课堂' ? '课堂' : '训练'}</div>;
      },
      ...props.setDefaultClumns?.type,
    },
    {
      title: '日期',
      dataIndex: 'date',
      valueType: 'checkbox',
      valueEnum: {
        0: {
          text: '周一',
        },
        1: {
          text: '周二',
        },
        2: {
          text: '周三',
        },
        3: {
          text: '周四',
        },
        4: {
          text: '周五',
        },
        5: {
          text: '周六',
        },
        6: {
          text: '周日',
        },
      },

      render: (_, row) => {
        const r = row.date.reduce((p, c): string => {
          return p + weebk[c];
        }, '');
        return <span>{r.slice(0, r.length - 1)}</span>;
      },
      ...props.setDefaultClumns?.date,
    },
    ...props?.pushDefaultClumns,
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm key="delete" title="确定删除该记录吗?" onConfirm={() => {}}>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <EditableProTable
      rowKey={setTab.rowKey}
      headerTitle={setTab.headerTitle}
      recordCreatorProps={{
        record: () => {
          return { id: nanoid() };
        },
      }}
      columns={columns}
      value={dataSource}
      editable={{
        type: editableType,
        editableKeys,
        onSave: async (rowKey, data, row) => {
          operationalDdata({ rowKey, data, row }, 'save');
          return Promise.resolve(true);
        },
        onChange: setEditableRowKeys,
        actionRender: (row, config, dom) => [dom.save, dom.cancel],
      }}
    />
  );
};
export default AppointmentConfing;
