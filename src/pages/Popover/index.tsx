import { Button, Popover } from 'antd';
import React from 'react';

const content = (
  <div
    style={{
      width: 270,
      // height: 100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
  >
    <p>
      打完就安慰和进口打完就安慰和进口打完就安慰和进口打完就安慰和进口打完就安慰和进口打完就安慰和进口打完就安慰和进口打完就安慰和进口打完就安慰和进口打完就安慰和进口
    </p>
  </div>
);

const App: React.FC = () => (
  <div>
    <Popover
      overlayStyle={{ width: 300 }}
      overlayInnerStyle={{ backgroundColor: 'red' }}
      content={content}
      title="Title"
      trigger="click"
    >
      <Button>Hover me</Button>
    </Popover>
  </div>
);

export default App;
