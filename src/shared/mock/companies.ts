import { CompanyDTO } from '../types/dto';
import { getRandomElement } from '../utils/getRandomElement';

const TOTAL_COMPANIES = 100;

const FIRST_WORDS = ['ПАО', 'ЗАО', 'ООО', 'ОАО'];

const SECOND_WORDS = [
  'Таинственные',
  'Хихикающие',
  'Древние',
  'Писклявые',
  'Задумчивые',
  'Лопоухие',
  'Ловкие',
  'Скользкие',
  'Пушистые',
  'Озорные',
  'Нескладные',
  'Воинственные',
  'Экзотические',
  'Светлые',
  'Тёмные',
  'Чудесные',
  'Острожные',
  'Дурноголовые',
  'Упоротые',
  'Упитанные',
];

const THIRD_WORD = [
  'Орки',
  'Вампиры',
  'Демоны',
  'Некроманты',
  'Дроу',
  'Эльфы',
  'Феи',
  'Упыри',
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

export const mockCompanies: CompanyDTO[] = Array.from(
  { length: TOTAL_COMPANIES },
  (_, index) => ({
    name: generateName(),
    address: getRandomElement(LOCATIONS),
    id: (Math.random() + index).toString(36).slice(3),
  }),
);
