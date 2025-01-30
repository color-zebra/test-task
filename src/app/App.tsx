import { Provider } from 'react-redux';
import { store } from './store';
import { CompaniesTable } from '../widget/CompaniesTable';

function App() {
  return (
    <Provider store={store}>
      <CompaniesTable />
    </Provider>
  );
}

export default App;
