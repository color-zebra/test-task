import { useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { Sentinel } from '../../../shared/ui/Sentinel';
import {
  addCompany,
  deleteSelectedCompanies,
  getCompaniesToRender,
  setCompaniesToRender,
  toggleSelectAll,
  toggleSelectCompany,
} from '../model/slice';
import { useVirtualScroll } from '../../../shared/hooks/useVirtualScroll';
import { formDataToObject } from '../../../shared/utils/formDataToObject';
import { isCompanyDTO } from '../../../shared/guards/isCompanyDTO';

const ITEMS_IN_LOAD_AMOUNT = 10;
const ROW_HEIGHT = 40;

export const CompaniesTable = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(getCompaniesToRender);
  const totalCompaniesLength = useAppSelector(
    (store) => store.companies.companies.length,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const getContainer = useCallback(() => containerRef.current, []);
  const loadMore = () => {
    dispatch(
      setCompaniesToRender({
        itemsToRender: companies.length + ITEMS_IN_LOAD_AMOUNT,
      }),
    );
  };
  const { startIndex, endIndex, totalHeight, offset } = useVirtualScroll({
    getScrollElement: getContainer,
    itemHeight: ROW_HEIGHT,
    totalItems: companies.length,
  });

  const itemsToRender = companies.slice(startIndex, endIndex + 1);

  const isAllChecked =
    companies.every(({ isSelected }) => isSelected) && companies.length !== 0;

  return (
    <>
      <div
        style={{
          height: 600,
          overflow: 'auto',
          width: '620px',
          position: 'relative',
        }}
        ref={containerRef}
      >
        <div
          style={{
            height: totalHeight,
            position: 'relative',
          }}
        >
          <table
            style={{
              position: 'absolute',
              top: offset,
              width: '100%',
              // translate: `0 ${offset}px`,
            }}
          >
            <thead
              style={{
                position: 'sticky',
                top: 0,
                translate: `0 0px`,
                background: 'rebeccapurple',
                color: 'white',
              }}
            >
              <tr style={{ height: ROW_HEIGHT }}>
                <th style={{ width: '50px' }}>
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={() => dispatch(toggleSelectAll())}
                  />
                </th>
                <th style={{ width: '275px' }}>Название</th>
                <th style={{ width: '275px' }}>Адрес</th>
              </tr>
            </thead>
            <tbody>
              {itemsToRender.map(({ name, id, address, isSelected }) => (
                <tr style={{ height: ROW_HEIGHT }} key={id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        dispatch(toggleSelectCompany({ id, isSelected }))
                      }
                    />
                  </td>
                  <td>{name}</td>
                  <td>{address}</td>
                </tr>
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

      <button
        onClick={() => dispatch(deleteSelectedCompanies())}
        disabled={!companies.some(({ isSelected }) => isSelected)}
      >
        Удалить выбранные
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = {
            ...formDataToObject(formData),
            id: Date.now().toString(),
          };

          if (isCompanyDTO(data)) {
            dispatch(addCompany(data));
          }
        }}
      >
        <input name="name" type="text" />
        <input name="address" type="text" />
        <button>Добавить</button>
      </form>
    </>
  );
};
