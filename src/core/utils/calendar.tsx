/**
 * Check if the year is leap
 */
const isLeap = (date: Date): Boolean =>
  date.getFullYear() % 100 !== 0 && date.getFullYear() % 4 === 0;

/**
 * Return first day of month
 */
const firstDayMonth = (date: Date): number => date.getDay();

/**
 * when month is equal to 0, return to 11
 */
const lastMonth = (date: Date): number =>
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

export { isLeap, firstDayMonth, lastMonth, nextMonth, totalDaysOfMonth };
