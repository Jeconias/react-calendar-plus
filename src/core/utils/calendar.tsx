/**
 * Check if the year is leap
 */
const isLeap = (date: Date): Boolean =>
  date.getFullYear() % 100 !== 0 && date.getFullYear() % 4 === 0;

/**
 * Return first day of month
 */
const firstDayMonth = (date: Date): number => {
  const newDate = date.setDate(1);
  return new Date(newDate).getDay();
};

/**
 * when month is equal to 0, return to 11
 */
const previousMonth = (date: Date): number =>
  date.getMonth() != 0 ? date.getMonth() - 1 : 11;

/**
 * when month is 11, return to 0
 */
const nextMonth = (date: Date): number =>
  date.getMonth() != 11 ? date.getMonth() + 1 : 0;

/**
 * Method to return total days of month
 */
const totalDaysOfMonth = (date: Date): number => {
  let currentMonth = date.getMonth();

  if (currentMonth === -1) currentMonth = 11;

  if (
    currentMonth === 0 ||
    currentMonth === 2 ||
    currentMonth === 4 ||
    currentMonth === 6 ||
    currentMonth === 7 ||
    currentMonth === 9 ||
    currentMonth === 11
  ) {
    return 31;
  } else if (
    currentMonth === 3 ||
    currentMonth === 5 ||
    currentMonth === 8 ||
    currentMonth === 10
  ) {
    return 30;
  } else {
    return isLeap(date) ? 29 : 28;
  }
};

/**
 * add zero to the left
 */

const addLeftZero = (
  element: string | number,
  addInLeft: string = '0',
  length: number = 2,
): string => {
  if (typeof element === 'number') {
    if (element > 9) return element.toString();
    return element.toString().padStart(length, addInLeft);
  }
  return element.padStart(length, addInLeft);
};

/**
 * Date to string day/month/year
 */
const dateFormat = (date: Date, withZero: boolean = true): string => {
  if (withZero)
    return `${addLeftZero(date.getDate())}/${addLeftZero(
      date.getMonth(),
    )}/${date.getFullYear()}`;

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

/**
 * Clone date object
 */
const clone = (date: Date) => new Date(date);

export {
  isLeap,
  firstDayMonth,
  previousMonth,
  nextMonth,
  totalDaysOfMonth,
  dateFormat,
  addLeftZero,
  clone,
};
