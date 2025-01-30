import { getRandomElement } from '../utils/getRandomElement';

type Company = {
  name: string;
  address: string;
  id: string;
};

const TOTAL_COMPANIES = 10_000;

const FIRST_WORDS = ['ПАО', 'ЗАО', 'ООО', 'ОАО'];

const SECOND_WORDS = [
  'Таинственные',
  'Величественные',
  'Древние',
  'Грациозные',
  'Задумчивые',
  'Могущественные',
  'Ловкие',
  'Мистические',
  'Благородные',
  'Озорные',
  'Хитроумные',
  'Воинственные',
  'Экзотические',
  'Светлые',
  'Тёмные',
  'Чудесные',
  'Острожные',
  'Харизматичные',
  'Элегантные',
  'Устойчивые',
];

const THIRD_WORD = [
  'Орки',
  'Вампиры',
  'Демоны',
  'Некроманты',
  'Дроу',
  'Эльфы',
  'Феи',
  'Единороги',
  'Гномы',
  'Хоббиты',
  'Кентавры',
  'Энты',
  'Драконы',
];

const LOCATIONS = [
  'Штормград',
  'Оргриммар',
  'Громовой Утёс',
  'Подгород',
  'Дарнас',
  'Экзодар',
  'Лунный Колодец',
  'Стальгорн',
  'Луносвет',
  'Шаттрат',
  'Даларан',
  'Низина Арати',
  'Поля Бастиона',
  'Награнд',
  'Пустоверть',
  'Террокарский лес',
  "Зул'Гуруб",
  'Пылающий Устморт',
  'Чёрная гора',
  'Силитус',
];

const generateName = () =>
  `${getRandomElement(FIRST_WORDS)} "${getRandomElement(
    SECOND_WORDS,
  )} ${getRandomElement(THIRD_WORD)}"`;

export const mockCompanies: Company[] = Array.from(
  { length: TOTAL_COMPANIES },
  (_, index) => ({
    name: generateName(),
    address: getRandomElement(LOCATIONS),
    id: (Math.random() + index).toString(36).slice(3),
  }),
);
