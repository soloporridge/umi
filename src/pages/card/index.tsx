import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard title="左侧详情" colSpan="30%" bodyStyle={{ marginRight: '40px' }}>
        左侧内容
      </ProCard>
      <ProCard title="左右分栏子卡片带标题" headerBordered>
        <div style={{ height: 360 }}>右侧内容</div>
      </ProCard>
      <ProCard title="左右分栏子卡片带标题" headerBordered>
        <div style={{ height: '100%' }}>右侧内容</div>
      </ProCard>
    </>
  );
};
