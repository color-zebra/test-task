import { FormEvent } from 'react';
import { useAppDispatch } from '../../app/store';
import { formDataToObject } from '../../shared/utils/formDataToObject';
import { isCompanyDTO } from '../../shared/guards/isCompanyDTO';
import { addCompany } from '../../shared/store/slices/companies';

import s from './CreateCompanyForm.module.scss';

export const CreateCompanyForm = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      ...formDataToObject(formData),
      id: Date.now().toString(),
    };

    if (isCompanyDTO(data)) {
      dispatch(addCompany(data));
      form.reset();
    }
  };
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        placeholder="Название"
        name="name"
        type="text"
      />
      <input
        className={s.input}
        placeholder="Адрес"
        name="address"
        type="text"
      />
      <button className={s.button}>Добавить</button>
    </form>
  );
};
