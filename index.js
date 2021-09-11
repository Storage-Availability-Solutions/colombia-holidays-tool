const nequiHolidays = require('colombia-holidays');
const {zonedTimeToUtc} = require('date-fns-tz');
const {isSameDay, isWeekend, addDays} = require('date-fns');

/**
 * Date to UTC in Colombia timezone
 *
 * @param {Date} date           - Date to convert
 * @returns {Date}              - UTC date
 */
const to_utc = date => zonedTimeToUtc(new Date(date), 'America/Bogota');

/**
 * Is the date a colombian holiday?
 *
 * @param {Date} date             - Date to check
 * @returns {Boolean}             - True if the date is a holiday
 */
const isHoliday = date => {
  const utc_date = to_utc(date);
  const holidays = nequiHolidays.getColombiaHolidaysByYear(
    utc_date.getFullYear(),
  );
  const result = holidays.filter(({holiday}) => {
    return isSameDay(utc_date, new Date(holiday));
  });
  return isWeekend(utc_date) || result.length > 0;
};

/**
 * Get closest working day in a given direction
 *
 * @param {Date} date                  - Date to find the closest working day
 * @param {'+'|'-'} direction          - Direction to move
 * @returns {Date}                     - Closest working day
 */
const getClosestWorkDay = (date, direction = '+') => {
  let utc_date = to_utc(date);
  const dayToAdd = direction === '+' ? 1 : -1;
  while (isHoliday(utc_date)) {
    utc_date = addDays(utc_date, dayToAdd);
  }
  return utc_date;
};

/**
 * Add colombian bussiness days to a date
 *
 * @param {Date} date               - Date to add bussiness days
 * @param {number} amount           - Amount of days to add
 * @returns {Date}                  - Date with bussiness days added
 */
const addBussinessDays = (date, amount) => {
  let utc_date = to_utc(date);
  for (let i = amount; i > 0; i--) {
    utc_date = getClosestWorkDay(utc_date, amount > 0 ? '+' : '-');
    utc_date = addDays(utc_date, amount > 0 ? 1 : -1);
  }
  return getClosestWorkDay(utc_date, amount > 0 ? '+' : '-');
};

module.exports = {
  isHoliday,
  getClosestWorkDay,
  addBussinessDays,
};
