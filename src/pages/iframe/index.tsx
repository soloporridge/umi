import './styles.less';
const Iframe = () => {
  return (
    <div>
      <h1>本身内容</h1>
      <div className="box">
        <div className="conten">
          <ul>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
          </ul>
        </div>
      </div>
      <div>
        <h1>嵌套内容</h1>
        <iframe
          src="https://www.csdn.net/"
          frameBorder="0"
          width="100%"
          height="800px"
          scrolling="auto"
        />
      </div>
    </div>
  );
};

export default Iframe;
