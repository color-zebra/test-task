import { Provider } from 'react-redux';
import { CounterWithRedux } from '../features/CounterWithRedux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <CounterWithRedux />
    </Provider>
  );
}

export default App;
