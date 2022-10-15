import {
  PageContainer,
  ProCard,
  ProPageHeader,
  LightFilter,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProTable,
  ProForm,
} from '@ant-design/pro-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { Badge, Button, Tooltip, Table, Input, Form, Row, Col, DatePicker, Pagination } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { useState } from 'react';
const { Search } = Input;
const { RangePicker } = DatePicker;
import './styles.less';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  status: number;
}
const statusData = [
  {
    text: '未开始',
    color: '#333',
    value: 0,
  },
  {
    text: '进行中',
    color: 'skyblue',
    value: 1,
  },
  {
    text: '爽约',
    color: 'red',
    value: 2,
  },
  {
    text: '迟到',
    color: 'yellow',
    value: 3,
  },
  {
    text: '已完成',
    color: 'blue',
    value: 4,
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
      },
    ],
    filterIcon: <div>123</div>, // 自定义筛选icon
    onFilter: (value: string, record) => record.name.indexOf(value) === 0,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value: string, record) => record.address.indexOf(value) === 0,
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: statusData,
    filterIcon: <div>123</div>, // 自定义筛选icon
    onFilter: (value: number, record): boolean => {
      return record.status === value;
    },
    sortDirections: ['descend'],
    render: (_, row) => {
      return (
        <div>
          {' '}
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: statusData[row.status].color,
            }}
          />{' '}
          {statusData[row.status].text}
        </div>
      );
    },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    status: 0, // 未开始
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: 1, // 进行中
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    status: 2, // 爽约
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    status: 3, // 迟到
  },
  {
    key: '5',
    name: 'Jim',
    age: 66,
    address: 'London No. 2 Lake Park',
    status: 4, // 完成
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ReservationRecordList = () => {
  return (
    <PageContainer title={[]}>
      <ProCard title="预约记录">
        <Form
          onFinish={(value) => {
            console.log('value', value);
          }}
        >
          <Row>
            <Col span={9}>
              <Form.Item label="选择预约时间段" name="timeQuantum">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Col span={9} push={1}>
              <Form.Item label="选择预约时间" name="time">
                <RangePicker showTime />
              </Form.Item>
            </Col>
            <Col span={3} push={2}>
              <Button htmlType="submit" style={{ marginRight: '10px' }}>
                查询
              </Button>
              <Button htmlType="reset">重置</Button>
            </Col>
          </Row>
          <Row>
            <Col span={9}>
              <Form.Item name="search">
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="mc_table">
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={{
              pageSize: 2,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: [2, 5, 7],
              showTotal: (total, range) => {
                console.log(total, range);
                return <div>共 400 条记录 第1 / 80 页</div>;
              },
              onChange: (page, pageSize) => {
                console.log('page', page);
                console.log('pageSize', pageSize);
              },
            }}
          />
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default ReservationRecordList;
