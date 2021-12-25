const spacetime = require('spacetime');
const nequiHolidays = require('colombia-holidays');

/**
 * Is the date a colombian holiday?
 *
 * @param {Date} date             - Date to check
 * @returns {Boolean}             - True if the date is a holiday
 */
const isHoliday = date => {
  const newDate = toColombianTimezoneDate(date);
  const holidays = nequiHolidays.getColombiaHolidaysByYear(newDate.year());
  const result = holidays.filter(({holiday}) => {
    const dateHoliday = toColombianTimezoneDate(new Date(holiday));
    return newDate.isSame(dateHoliday, 'date');
  });
  return isWeekend(newDate) || result.length > 0;
};

/**
 * Get closest working day in a given direction
 *
 * @param {Date} date                  - Date to find the closest working day
 * @param {'+'|'-'} direction          - Direction to move
 * @returns {Date}                     - Closest working day
 */
const getClosestWorkDay = (date, direction = '+') => {
  let newDate = toColombianTimezoneDate(date);
  const dayToAdd = direction === '+' ? 1 : -1;
  do {
    newDate = newDate.add(dayToAdd, 'day');
  } while (isHoliday(newDate.d));
  return newDate.d;
};

/**
 * Add or substract colombian bussiness days to a date
 *
 * @param {Date} date               - Date to add bussiness days
 * @param {number} amount           - Amount of days to add or substract
 * @returns {Date}                  - Date with bussiness days added
 */
const addBussinessDays = (date, amount) => {
  let newDate = toColombianTimezoneDate(date);
  const dayToAdd = amount > 0 ? 1 : -1;
  while (amount * dayToAdd > 0) {
    const closestWorkDay = getClosestWorkDay(newDate.d, amount > 0 ? '+' : '-');
    newDate = toColombianTimezoneDate(closestWorkDay);
    amount -= dayToAdd;
  }
  return newDate.d;
};

/**
 * Date to Colombia timezone
 * @param {Date} date                  - Date to convert
 * @returns {spacetime}                - Date in Colombia timezone
 */
const toColombianTimezoneDate = date => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return spacetime(`${year}-${month}-${day}`, 'America/Bogota');
};

/**
 * Is the date a weekend?
 * @param {spacetime} spacetimeDate     - Date to check
 * @returns {Boolean}                   - True if the date is a weekend
 */
const isWeekend = spacetimeDate => {
  const dayOfWeek = spacetimeDate.day();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

module.exports = {
  isHoliday,
  getClosestWorkDay,
  addBussinessDays,
};
