import { useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { Sentinel } from '../../../shared/ui/Sentinel';
import {
  deleteSelectedCompanies,
  getCompaniesToRender,
  getTotalCompaniesLength,
  loadMoreCompanies,
  toggleSelectAll,
  toggleSelectCompany,
} from '../model/slice';
import { useVirtualScroll } from '../../../shared/hooks/useVirtualScroll';
import { TableRow } from '../../../shared/ui/TableRow';
import { TableHead } from '../../../shared/ui/TableHead';

import s from './CompaniesTable.module.scss';
import { CreateCompanyForm } from '../../../features/CreateCompanyForm';
const ROW_HEIGHT = 60;

export const CompaniesTable = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const getContainer = useCallback(() => containerRef.current, []);

  const dispatch = useAppDispatch();
  const companies = useAppSelector(getCompaniesToRender);
  const totalCompaniesLength = useAppSelector(getTotalCompaniesLength);

  const { startIndex, endIndex, totalHeight, offset } = useVirtualScroll({
    getScrollElement: getContainer,
    itemHeight: ROW_HEIGHT,
    totalItems: companies.length,
  });
  const virtualizationStyle = {
    '--row-height': `${ROW_HEIGHT}px`,
    '--total-height': `${totalHeight}px`,
    '--offset': `${offset}px`,
  } as React.CSSProperties;

  const deleteSelected = () => dispatch(deleteSelectedCompanies());
  const loadMore = () => dispatch(loadMoreCompanies());

  const itemsToRender = companies.slice(startIndex, endIndex + 1);
  const isAllChecked =
    companies.every(({ isSelected }) => isSelected) && companies.length !== 0;
  const isSomeSelected =
    isAllChecked || companies.some(({ isSelected }) => isSelected);

  return (
    <>
      <div style={virtualizationStyle} className={s.wrapper} ref={containerRef}>
        <div className={s['scroll-wrapper']}>
          <table className={s.table}>
            <TableHead className={s.table__head}>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={() => dispatch(toggleSelectAll())}
              />
              {'Название'}
              {'Адрес'}
            </TableHead>
            <tbody>
              {itemsToRender.map(({ name, id, address, isSelected }) => (
                <TableRow className={s.table__row} key={id}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() =>
                      dispatch(toggleSelectCompany({ id, isSelected }))
                    }
                  />
                  {name}
                  {address}
                </TableRow>
              ))}
            </tbody>
            {companies.length < totalCompaniesLength && (
              <Sentinel
                getIntersectionContainer={getContainer}
                onInView={loadMore}
              />
            )}
          </table>
        </div>
      </div>
      <div className={s.controls}>
        <button onClick={deleteSelected} disabled={!isSomeSelected}>
          Удалить
        </button>
        <CreateCompanyForm />
      </div>
    </>
  );
};
