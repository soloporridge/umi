import { Carousel, Button } from 'antd';
import { useModel } from 'umi';
import React, { useRef } from 'react';
import type { CarouselRef } from 'antd/lib/carousel';
import './styles.less';
const contentStyle: React.CSSProperties = {
  // height: '160px',
  // width: '100%',
  height: '100%',
  color: '#fff',
  // lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const carouselRef = useRef<CarouselRef>();
  const { names } = useModel('@@initialState', (state) => {
    console.log('state', state);

    return { names: state.initialState?.names };
  });
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Button
        onClick={() => {
          carouselRef.current?.prev();
        }}
      >
        上
      </Button>
      <Button
        onClick={() => {
          carouselRef.current?.next();
        }}
      >
        下
      </Button>
      <div style={{ width: 500, height: 1000, position: 'relative' }} className="www">
        <Carousel afterChange={onChange} ref={carouselRef}>
          <div>
            <h3
              style={{
                height: '1000px',
                color: '#fff',
                textAlign: 'center',
                background: '#364d79',
              }}
            >
              1
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <div
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        >
          指示器
        </div>
      </div>
      <div style={{ width: 500 }}>
        <Carousel afterChange={onChange} style={{ height: 1000 }}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default App;
