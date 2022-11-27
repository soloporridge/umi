import { useEffect } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Chart } from '@antv/g2';
import { Button } from 'antd';
import { Test } from '@/services';
const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];
const G2 = () => {
  useEffect(() => {
    const chart = new Chart({
      container: 'G2',
      height: 500,
      width: 500,
    });
    // chart.legend({ // 设置title背景颜色
    //   background: {
    //     style: {
    //       fill: 'red',
    //     },
    //   },
    // });

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.data(data);

    chart.scale('percent', {
      formatter: (val) => {
        val = val * 100 + '%';
        return val;
      },
    });

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart

      .interval()
      .position('percent')
      .color('item')
      .label('percent', {
        layout: [{ type: 'limit-in-plot', cfg: { action: 'ellipsis' /** 或 translate */ } }],
        content: (data) => {
          return `${data.item}: ${data.percent * 100}%`;
        },
      })
      .adjust('stack');
    chart.interaction('element-active');
    chart.theme({
      styleSheet: {
        // paletteQualitative10: [
        //   '#025DF4',
        //   '#DB6BCF',
        //   '#2498D1',
        //   '#BBBDE6',
        //   '#4045B2',
        //   '#21A97A',
        //   '#FF745A',
        //   '#007E99',
        //   '#FFA8A8',
        //   '#2391FF',
        // ],
        // backgroundColor: 'red', // 设置背景色
      },
    });
    chart.render();
  }, []);

  return (
    <PageContainer>
      <Button
        onClick={() => {
          Test()
            .then((res) => {
              console.log('res', res);
            })
            .catch((err) => {
              console.log('err', err);
            });
        }}
      >
        发请求
      </Button>
      <ProCard
        style={{
          backgroundColor: 'red',
        }}
      >
        <div id="G2" />
      </ProCard>
    </PageContainer>
  );
};

export default G2;
