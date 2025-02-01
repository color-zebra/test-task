import { Provider } from 'react-redux';
import { store } from './store';
import './styles/normalize.scss';
import './styles/common.scss';
import { CompaniesTable } from '../widget/CompaniesTable';

function App() {
  return (
    <Provider store={store}>
      <CompaniesTable />
    </Provider>
  );
}

export default App;
