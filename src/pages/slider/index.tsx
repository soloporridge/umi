import { Slider, Switch, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import './styles.less';
const App: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const sliderRef = useRef();
  useEffect(() => {
    console.log(sliderRef.current.width);
  }, []);
  return (
    <>
      <div ref={sliderRef}>
        <Slider
          defaultValue={30}
          disabled={disabled}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      <Button
        onClick={() => {
          console.log(sliderRef.current.offsetWidth);
        }}
      >
        ad
      </Button>
    </>
  );
};

export default App;
