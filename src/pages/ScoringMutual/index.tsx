/*
 * @Author: lileichao
 * @Date: 2022-11-08 09:54:53
 * @LastEditors: lileichao
 * @LastEditTime: 2022-11-25 15:01:55
 * @Description: 同伴互助
 * @Copyright: 深圳妙创医学有限公司2021
 */
import { PageContainer } from '@ant-design/pro-layout';
import { ProCard } from '@ant-design/pro-components';
import { useLocation, useModel } from 'umi';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Select, Input, Button, InputNumber } from 'antd';
import Upload from './components/Upload';
import MutualTree from './components/MutualTree';
import MutualTab from './components/MutualTab';

// import { queryList, operationList } from '@/services/scoringManagement';

const ScoringMutual = () => {
  const location = useLocation();
  const { setId, scoringSectionList } = useModel('steps', (mode) => {
    return {
      setId: mode.setId,
      scoringSectionList: mode.scoringSectionList,
    };
  });
  const [recordId, useRecordId] = useState<number>();
  useEffect(() => {
    // const { query } = location;
    // console.log('---Id', query.recordId);
    // if (query?.recordId) {
    //   setId(query?.recordId as number);
    //   queryList({ id: query.recordId }).then((res) => {
    //     console.log('res---列表', res);
    //   });
    //   operationList(query.recordId).then((res) => {
    //     console.log('res--操作列表', res);
    //   });
    // }
    setId(10);
  }, [location]);
  return (
    <PageContainer>
      <ProCard>
        <Form
          labelCol={{
            span: 6,
          }}
        >
          <Row>
            <Col span={7}>
              <Form.Item name="name" label="评分表名称">
                <Input />
              </Form.Item>
            </Col>
            <Col push={16} span={1}>
              <Button
                type="primary"
                onClick={() => {
                  console.log('scoringSectionList', scoringSectionList);
                }}
              >
                保存
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <Form.Item label="所属操作(项目)" name="project">
                <Select
                  placeholder="请选择"
                  defaultValue="lucy"
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
                      label: 'Disabled',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="时长限制">
                <InputNumber />
                &nbsp;&nbsp;分钟
              </Form.Item>
            </Col>
            <Col push={2} span={7}>
              <Form.Item label="绑定考题" name="project">
                <Select
                  placeholder="请选择"
                  defaultValue="lucy"
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
                      label: 'Disabled',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col push={2} span={8}>
              <Form.Item label="封面图片" name="project">
                <Upload>{/* <div>上传封面图</div> */}</Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ProCard>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost>
        <ProCard colSpan="300px" bordered title="项目及步骤结构">
          <MutualTree />
        </ProCard>
        {/* <ProCard
          title="评分细则列表"
          extra={[
            <Button style={{ marginRight: 10 }}>新增评分细则</Button>,
            <Button>Excel导入</Button>,
          ]}
          bordered
        >
          <MutualTab />
        </ProCard> */}
        <MutualTab />
      </ProCard>
    </PageContainer>
  );
};

export default ScoringMutual;
