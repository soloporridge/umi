import { Button } from 'antd';
import { useModel } from 'umi';
const App = () => {
  const { setInitialState, initialState } = useModel('@@initialState', (state) => {
    return { setInitialState: state.setInitialState, initialState: state.initialState };
  });
  const { user, signin } = useModel('useAuthModel', (state) => {
    return { user: state.user, signin: state.signin };
  });
  return (
    <div>
      <Button
        onClick={() => {
          // console.log('get', initialState);
          console.log('get', user);
        }}
      >
        get
      </Button>
      <Button
        onClick={() => {
          console.log('set');
          setInitialState({ ...initialState, names: 'kkkkk' });
          signin({ user: 123 });
        }}
      >
        set
      </Button>
    </div>
  );
};
export default App;
