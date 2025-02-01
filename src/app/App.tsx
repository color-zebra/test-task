import { Provider } from 'react-redux';
import { store } from './store';
import { CompaniesTable } from '../widget/CompaniesTable';
import './styles/normalize.scss';
import './styles/common.scss';

function App() {
  return (
    <Provider store={store}>
      <CompaniesTable />
    </Provider>
  );
}

export default App;
