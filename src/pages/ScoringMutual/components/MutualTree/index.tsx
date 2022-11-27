/*
 * @Author: lileichao
 * @Date: 2022-11-08 11:18:59
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 17:57:35
 * @Description: file content
 * @Copyright: 深圳妙创医学有限公司2021
 */
import { useEffect } from 'react';
import { useModel } from 'umi';
import { CarryOutOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Tree, Dropdown, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { sectionList } from '@/utils/MutualTree';
import type { DataNode } from 'antd/es/tree';
import React, { useState } from 'react';

import type { MenuProps } from 'antd';

const ModalData = [
  {
    title: '新增项目',
    labe: '项目名称',
    placeholder: '请输入项目名称',
  },
  {
    title: '新增步骤',
    labe: '步骤名称',
    placeholder: '请输入步骤名称',
  },
];

const countScore = (arr: any[]) => {
  // return arr.reduce((prev, next) => {
  //   return prev + next.score;
  // }, 0);
  let sum = 0;
  arr.forEach((item) => {
    item.scoringDeductionList.forEach((item) => {
      sum += item.score;
    });
  });
  return sum;
};

const createTreeData = (arr: any[]) => {
  const data: DataNode[] = [];
  const score = { scoreAll: 0 };
  for (let i = 0; i < arr.length; i++) {
    const current: any = {};

    if (arr[i]?.scoringStep?.length) {
      const n = countScore(arr[i].scoringStep);
      current.title = `${arr[i].title} (${n})分`;
      current.key = arr[i].id;
      current.children = createTreeData(arr[i].scoringStep);
      score.scoreAll = score.scoreAll += n;
      console.log('scoringStep', n);

      data.push(current);
    } else {
      current.title = arr[i].title;
      current.key = arr[i].id;
      data.push(current);
    }
  }
  console.log('score---', score);

  return data;
};

const MutualTree: React.FC = () => {
  const [form] = Form.useForm();
  const [treeDatas, setTreeDatas] = useState<DataNode[]>();
  const [open, setOpen] = useState<boolean>(false); // 右键操作项
  const [isModal, setIsModal] = useState<boolean>(false); // 新增项目步骤弹框
  const [stepsBtn, setStepsBtn] = useState<boolean>(true); // 步骤按钮是否可点击
  const [modalType, setModalType] = useState<0 | 1>(0); // 0项目 1步骤
  const [optionType, SetOptionType] = useState<'add' | 'edit'>();
  // const [current, setCurrent] = useState<{ key: string; pos: string; title: string }>(); // 当前点击或右键的树结构

  const { scoringSectionList, setSectionList, flag, setCurrentFn, current, scoringId } = useModel(
    'steps',
    (mode) => {
      return {
        scoringSectionList: mode.scoringSectionList,
        setSectionList: mode.setSectionList,
        flag: mode.flag,
        current: mode.current,
        setCurrentFn: mode.setCurrentFn,
        scoringId: mode.scoringId,
      };
    },
  );

  const addBtn = (type: 0 | 1) => {
    setModalType(type);
    SetOptionType('add');
    setIsModal(true);
  };

  const onSelect = (
    selectedKeys: React.Key[],
    info: {
      node: { key: string; pos: string; title: string };
    },
  ) => {
    const { node } = info;
    const pos = node.pos.split('-').length;
    if (pos === 2) {
      setStepsBtn(false);
      setModalType(0);
    } else {
      setStepsBtn(true);
      setModalType(1);
    }
    setCurrentFn(node);
    console.log('selected', selectedKeys, info);
  };
  const onRightClick = ({ event, node }: any) => {
    const pos = node.pos.split('-').length;
    if (pos === 2) {
      setModalType(0);
    } else {
      setModalType(1);
    }
    setCurrentFn(node);
    setOpen(true);
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div
          onClick={() => {
            SetOptionType('edit');
            setIsModal(true);
            setOpen(false);
            form.setFieldsValue({ name: current?.title });
          }}
        >
          编辑名称
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <Popconfirm
          title="删除该项目将一并删除相关的步骤和评分细则，确定将该操作项目吗？"
          placement="top"
          onConfirm={async () => {
            console.log('current', current);
            setSectionList(sectionList(scoringSectionList, current.key, 'delet', {}));
            setOpen(false);
            console.log('删除');
          }}
        >
          <div>删除</div>
        </Popconfirm>
      ),
      key: '2',
    },
  ];

  const modalOk = async () => {
    try {
      const { name } = await form.validateFields();
      const copy = [...scoringSectionList];
      if (optionType === 'add') {
        if (modalType === 0) {
          copy.push({
            id: Date.now(),
            scoringId: scoringId as number,
            title: name,
            scoringStep: [],
          });
          setSectionList(copy);
        } else {
          const step = {
            id: Date.now(),
            scoringId: scoringId as number,
            title: name,
            scoringDeductionList: [],
          };
          const res = sectionList(copy, current?.key as string, 'add', {
            step,
          });
          console.log('res', res);

          setSectionList(res);
        }
      } else {
        const res = sectionList(copy, current?.key as string, 'edit', {
          title: name,
        });
        setSectionList(res);
      }
      setIsModal(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('current', current);
  }, [current]);
  useEffect(() => {
    console.log('zhix ');

    setTreeDatas(createTreeData(scoringSectionList));
  }, [scoringSectionList, flag]);
  return (
    <div style={{ minHeight: 550 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{ marginRight: 10 }} onClick={() => addBtn(0)}>
          新增项目
        </Button>
        <Button disabled={stepsBtn} onClick={() => addBtn(1)}>
          新增步骤
        </Button>
      </div>
      <div style={{ padding: '15px 0' }}>
        <span>评分表总分：{30}</span>
      </div>
      <Dropdown
        menu={{ items }}
        trigger={['contextMenu']}
        open={open}
        onOpenChange={(is) => {
          if (!is) setOpen(is);
        }}
      >
        <Tree showLine treeData={treeDatas} onSelect={onSelect} onRightClick={onRightClick} />
      </Dropdown>
      <Modal
        open={isModal}
        onOk={modalOk}
        title={ModalData[modalType].title}
        onCancel={() => {
          setIsModal(false);
        }}
      >
        <Form form={form}>
          <Form.Item name="name" label={ModalData[modalType].labe}>
            <Input placeholder={ModalData[modalType].placeholder} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MutualTree;
