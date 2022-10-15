import { CheckCard, ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard>
      <CheckCard.Group
        bordered={false}
        onChange={(value: any) => {
          console.log('value', value);
        }}
        defaultValue="A"
      >
        <CheckCard
          description={[
            <ProCard key="1" title="选项1">
              <div>123</div>
            </ProCard>,
          ]}
          value="A"
        />
        <CheckCard title="Card B" description="选项二" value="B" />
        <CheckCard title="Card C" description="选项三，这是一个不可选项" value="C" />
      </CheckCard.Group>
    </ProCard>
  );
};
