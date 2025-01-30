import s from './CounterWithRedux.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { increment } from '../../app/store/counterSlice';

export const CounterWithRedux = () => {
  const value = useAppSelector((store) => store.counter.value);
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(increment());

  return (
    <>
      <div className={s.card}>
        <button data-testid="redux-counter-button" onClick={handleClick}>
          count is <span data-testid="redux-counter-value">{value}</span>
        </button>
      </div>
    </>
  );
};
