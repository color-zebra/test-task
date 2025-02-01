import React, { memo } from 'react';
import {
  CompanyStoreData,
  editCompanyField,
  EditFieldPayload,
  toggleSelectCompany,
} from '../../../../shared/store/slices/companies';
import s from './CompaniesRow.module.scss';
import { TableRow } from '../../../../shared/ui/TableRow';
import { EditableField } from '../../../../shared/ui/EditableField';
import { useAppDispatch } from '../../../../app/store';

export const CompaniesRow = memo(
  ({ company }: { company: CompanyStoreData }) => {
    const { address, id, isSelected, name } = company;
    const dispatch = useAppDispatch();
    const editField = (companyData: EditFieldPayload) =>
      dispatch(editCompanyField(companyData));

    return (
      <TableRow className={`${s.row}${isSelected ? ` ${s.selected}` : ''}`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => dispatch(toggleSelectCompany({ id, isSelected }))}
        />
        <EditableField
          defaultValue={name}
          onEditComplete={(value) => editField({ field: 'name', id, value })}
        />
        <EditableField
          defaultValue={address}
          onEditComplete={(value) => editField({ field: 'address', id, value })}
        />
      </TableRow>
    );
  },
);

CompaniesRow.displayName = 'CompaniesRow';
