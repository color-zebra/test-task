import { Children, HTMLAttributes, PropsWithChildren } from 'react';

type TableHeadProps = PropsWithChildren<
  HTMLAttributes<HTMLTableSectionElement> & {
    classNames?: {
      row?: string;
      cell?: string | string[];
    };
  }
>;

export const TableHead = ({
  children,
  classNames,
  ...rest
}: TableHeadProps) => {
  return (
    <thead {...rest}>
      <tr>
        {Children.map(children, (child, i) => (
          <th
            className={
              Array.isArray(classNames?.cell)
                ? classNames?.cell[i]
                : classNames?.cell
            }
          >
            {child}
          </th>
        ))}
      </tr>
    </thead>
  );
};
