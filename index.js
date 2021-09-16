const nequiHolidays = require('colombia-holidays');
const {zonedTimeToUtc, utcToZonedTime} = require('date-fns-tz');
const {isSameDay, isWeekend, addDays} = require('date-fns');

/**
 * Date to UTC time
 *
 * @param {Date} date           - Date to convert
 * @returns {Date}              - UTC date
 * @example
 * const date = new Date('2020-01-01 05:00:00') // => Fri Jan 01 2020 05:00:00 GMT-0500 (Colombian Time);
 * to_utc(date) // => Fri Jan 01 2020 00:00:00 GMT-0500 (Colombian Time) or Fri Jan 01 2020 05:00:00 UTC;
 */
const to_utc = date => {
  return utcToZonedTime(new Date(date), 'Etc/UTC');
};

/**
 * Is the date a colombian holiday?
 *
 * @param {Date} date             - Date to check
 * @returns {Boolean}             - True if the date is a holiday
 */
const isHoliday = (date, timezone = 'America/Bogota') => {
  const utc_date = to_utc(date);
  const holidays = nequiHolidays.getColombiaHolidaysByYear(
    utc_date.getFullYear(),
  );
  const result = holidays.filter(({holiday}) => {
    let dateHoliday = to_utc(new Date(holiday));
    let zonedTime = zonedTimeToUtc(new Date(date), timezone);
    return isSameDay(zonedTime, dateHoliday);
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
  do {
    utc_date = addDays(utc_date, dayToAdd);
  } while (isHoliday(utc_date));
  return utc_date;
};

/**
 * Add or substract colombian bussiness days to a date
 *
 * @param {Date} date               - Date to add bussiness days
 * @param {number} amount           - Amount of days to add or substract
 * @returns {Date}                  - Date with bussiness days added
 */
const addBussinessDays = (date, amount) => {
  let utc_date = to_utc(date);
  const dayToAdd = amount > 0 ? 1 : -1;
  while (amount + dayToAdd !== 0) {
    utc_date = getClosestWorkDay(utc_date, amount > 0 ? '+' : '-');
    amount -= dayToAdd;
  }
  return utc_date;
};

module.exports = {
  isHoliday,
  getClosestWorkDay,
  addBussinessDays,
  to_utc,
};
