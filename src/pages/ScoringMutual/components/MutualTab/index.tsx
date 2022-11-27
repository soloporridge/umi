/*
 * @Author: lileichao
 * @Date: 2022-11-08 14:26:41
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 17:29:02
 * @Description: file content
 * @Copyright: 深圳妙创医学有限公司2021
 */

import { useModel } from 'umi';
import { MenuOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable, ProCard } from '@ant-design/pro-components';
import {
  Button,
  message,
  Modal,
  Form,
  InputNumber,
  Input,
  Select,
  // Upload as AntdUpload,
  Row,
  Col,
} from 'antd';
const { TextArea } = Input;
import { sectionList } from '@/utils/MutualTree';
import { useEffect, useState } from 'react';
import { SelectVoice, UploadPreview } from '../editItem';
import MeucanUpload from './component/MeucanUpload';
// import type { scoringDeductionListType } from '@/services/scoringManagement';
import type { UploadFile } from 'antd/es/upload/interface';

import './styles.less';
// import UploadPreview from './';
const f: UploadFile[] = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-4',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];
const data = [
  {
    key: 'key1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
    error: '芜湖',
    imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
  },
  {
    key: 'key2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    error: '芜湖',
    index: 1,
    imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
  },
  {
    key: 'key3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    error: '芜湖',
    index: 2,
    imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
  },
];
const defunctInputNumber = {
  max: 99,
  min: 1,
};
const setTabDatas = (arr: any[], id: number): any[] => {
  let tabData = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      console.log(arr[i]);
      if (arr[i]?.scoringDeductionList) {
        return arr[i].scoringDeductionList;
      } else {
        return [];
      }
    } else {
      tabData = setTabDatas(arr[i].scoringStep ?? [], id);
    }
  }
  return tabData;
};

const MutualTab = () => {
  const [form] = Form.useForm();
  const [tabData, setTabData] = useState<any>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalType, setModalType] = useState<0 | 1 | 2>(0); // 0新增评分细则 1添加图片 2新增语音
  const [dataSource2, setDatasource2] = useState(data);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    tabData.map((item) => item.id),
  );
  const { scoringId, current, scoringSectionList, setSectionList, flag } = useModel(
    'steps',
    (mode) => {
      return {
        scoringId: mode.scoringId,
        current: mode.current,
        scoringSectionList: mode.scoringSectionList,
        setSectionList: mode.setSectionList,
        flag: mode.flag,
      };
    },
  );

  const onIsModal = (type: {
    bool: boolean;
    modalTitle: string;
    modalType: 0 | 1 | 2;
    formData?: {
      name: string;
    };
  }) => {
    const { bool, formData } = type;
    setIsModal(bool);
    setModalType(type.modalType);
    if (formData) {
      form.setFieldsValue({ ...formData });
    }
  };
  const handelOk = async () => {
    try {
      const { title, score, audio, name, spd, pid, vol, per } = await form.validateFields();
      if (modalType === 0) {
        const scoringDeductionItem = {
          id: Date.now(),
          scoringId: scoringId as number,
          title,
          score,
          images: [...f],
          error: audio,
        };
        const res = sectionList(scoringSectionList, current.key, 'score', {
          score: scoringDeductionItem,
        });
        setSectionList(res);
        console.log('res', res);
        setIsModal(false);
        form.resetFields();
      } else if (modalType === 1) {
      } else if (modalType === 2) {
        console.log('name, spd, pid, vol, per', name, spd, pid, vol, per);
      }
    } catch (error) {}
  };

  const handleDragSortEnd2 = (newDataSource: any) => {
    setTabData(newDataSource);
    message.success('修改列表排序成功');
  };
  const columns2: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      editable: () => {
        return false;
      },
    },
    {
      title: '评分细则',
      dataIndex: 'title',
      editable: () => {
        return false;
      },
    },
    {
      title: '分值',
      dataIndex: 'score',
      editable: () => {
        return false;
      },
    },
    {
      title: '评分项图片',
      dataIndex: 'images',
      renderFormItem: () => {
        return <UploadPreview />;
      },
    },
    {
      title: '分项报错语音',
      dataIndex: 'error',
      renderFormItem: () => {
        return <SelectVoice onIsModal={onIsModal} />;
      },
    },
    {
      title: '操作',
      editable: () => {
        return false;
      },
      render: (_, row) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                onIsModal({ bool: true, modalTitle: '添加图片', modalType: 1 });
              }}
            >
              上传图片
            </Button>
            <Button type="link">编辑</Button>
          </>
        );
      },
    },
  ];

  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab' }} />
      <div style={{ marginLeft: 20 }}>{idx + 1}</div>
    </>
  );
  const onChangeSectionList = () => {
    const res = sectionList(scoringSectionList, current.key, 'score', {
      update: {
        data: tabData,
      },
    });
    setSectionList(res);
  };
  useEffect(() => {
    if (tabData.length) {
      setEditableRowKeys(() => tabData.map((item) => item.id));
    }
  }, [tabData]);

  useEffect(() => {
    console.log('scoringSectionList', scoringSectionList);
    if (current) {
      console.log(setTabDatas(scoringSectionList, current.key), '----------');
      setTabData([...setTabDatas(scoringSectionList, current.key)]);
    }
  }, [current, scoringSectionList, flag]);
  // scoringSectionList, flag
  return (
    <ProCard
      title="评分细则列表"
      extra={
        current?.pos.split('-').length === 3
          ? [
              <Button
                key="add"
                style={{ marginRight: 10 }}
                type="primary"
                onClick={() => {
                  setModalType(0);
                  setModalTitle('新增评分细则');
                  setIsModal(true);
                }}
              >
                新增评分细则
              </Button>,
              <Button key="sheet_improt" type="primary">
                Excel导入
              </Button>,
            ]
          : []
      }
      bordered
    >
      {tabData.length ? (
        <div style={{ minHeight: 550 }}>
          <DragSortTable
            className="meucan_drag_tab"
            columns={columns2}
            rowKey="id"
            search={false}
            options={false}
            dataSource={tabData}
            editable={{
              type: 'multiple',
              editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                console.log('onValuesChange', recordList);
                onChangeSectionList();
                setTabData(recordList);
              },
              onChange: setEditableRowKeys,
            }}
            pagination={{
              pageSize: 2,
            }}
            dragSortKey="sort"
            dragSortHandlerRender={dragHandleRender}
            onDragSortEnd={handleDragSortEnd2}
          />
        </div>
      ) : null}
      <Modal title={modalTitle} open={isModal} onOk={handelOk} onCancel={() => setIsModal(false)}>
        <Form form={form}>
          {modalType === 0 ? (
            <>
              <Form.Item label="评分细则数值" name="score">
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item label="评分细则内容" name="title">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="报错语音" name="audio">
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'disabled',
                      disabled: true,
                      label: 'Disabled',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                />
              </Form.Item>
            </>
          ) : modalType === 1 ? (
            <Form.Item name="img" label="上传图片">
              {/* <Upload listType="text" max={3} /> */}
              <MeucanUpload />
            </Form.Item>
          ) : (
            <div style={{ padding: 30 }}>
              <Form.Item
                label="语音文本"
                name="name"
                wrapperCol={{ span: 17 }}
                labelCol={{ span: 5 }}
                // required={[{ }]}
                rules={[{ required: true, message: '语音文本为必填' }]}
              >
                <Input />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item label="spd（语速）" name="spd">
                    <InputNumber {...defunctInputNumber} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="pit（音调）" name="pid">
                    <InputNumber {...defunctInputNumber} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="vol（音量）" name="vol">
                    <InputNumber {...defunctInputNumber} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="per（人声）" name="per">
                    <InputNumber {...defunctInputNumber} />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}
        </Form>
      </Modal>
    </ProCard>
  );
};

export default MutualTab;

/* 

useEffect(() => {
    if (current?.key) {
      console.log(
        'scoringSectionList---Update',
        sectionList(scoringSectionList, current.key, 'score', {
          update: {
            data: tabData,
          },
        }),
      );
      // const res = sectionList(scoringSectionList, current.key, 'score', {
      //   update: {
      //     data: tabData,
      //   },
      // });
      // setSectionList(res);
    }
  }, [tabData, current]);




*/
