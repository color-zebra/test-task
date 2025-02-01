import { Children, HTMLAttributes, PropsWithChildren } from 'react';

import s from './TableRow.module.scss';

export const TableRow = ({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) => {
  return (
    <tr {...rest}>
      {Children.map(children, (child) => (
        <td>
          <div className={s['cell-content']}>{child}</div>
        </td>
      ))}
    </tr>
  );
};
