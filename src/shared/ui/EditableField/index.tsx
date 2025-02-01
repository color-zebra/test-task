import { FocusEvent, HTMLAttributes, KeyboardEvent } from 'react';

import s from './EditableField.module.scss';

type EditableFieldProps = HTMLAttributes<HTMLInputElement> & {
  onEditComplete: (val: string) => void;
};

export const EditableField = ({
  defaultValue,
  onEditComplete,
}: EditableFieldProps) => {
  const handleBlur = ({
    target: { value },
  }: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (value != defaultValue) {
      onEditComplete(value);
    }
  };
  const handeKeyDown = ({
    key,
    target,
  }: KeyboardEvent<HTMLTextAreaElement>) => {
    if (key === 'Enter' || key === 'Escape') {
      (target as HTMLTextAreaElement).blur();
    }
  };
  return (
    <textarea
      className={s.input}
      defaultValue={defaultValue}
      onBlur={handleBlur}
      onKeyDown={handeKeyDown}
    />
  );
};
