import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { addCompany, deleteCompany, getAllCompanies } from '../model/slice';

export const CompaniesTable = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(getAllCompanies);
  const addNewCompany = () =>
    dispatch(addCompany({ address: 'Адрес', id: 'asd', name: 'Имя' }));
  const deleteNewCompany = () => {
    dispatch(deleteCompany({ id: 'asd' }));
  };

  return (
    <div>
      {companies.map(({ name, id, address }) => (
        <p key={id}>
          {name}, {id}, {address}
        </p>
      ))}
      <button onClick={addNewCompany}>Добавить</button>
      <button onClick={deleteNewCompany}>Убавить</button>
    </div>
  );
};
