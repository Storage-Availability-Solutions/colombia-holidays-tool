const nequiHolidays = require('colombia-holidays');
const {
  zonedTimeToUtc,
  utcToZonedTime,
  getTimezoneOffset,
} = require('date-fns-tz');
const {isSameDay, isWeekend, addDays, format} = require('date-fns');

/**
 * Date to UTC in Colombia timezone
 *
 * @param {Date} date           - Date to convert
 * @returns {Date}              - UTC date
 */
const to_utc = (date, timezone = 'America/Bogota') => {
  const copydate = zonedTimeToUtc(new Date(date), timezone);
  const offset = getTimezoneOffset(timezone, new Date(date));
  const returnDate = new Date(copydate.getTime() + offset);
  return new Date(copydate.getTime() + offset);
};
/**
 * Is the date a colombian holiday?
 *
 * @param {Date} date             - Date to check
 * @returns {Boolean}             - True if the date is a holiday
 */
const isHoliday = (date, timezone = 'America/Bogota') => {
  const utc_date = to_utc(date);
  const utc_day = utc_date.getDate();
  const date_day = date.getDate();
  const holidays = nequiHolidays.getColombiaHolidaysByYear(
    utc_date.getFullYear(),
  );
  const result = holidays.filter(({holiday}) => {
    let dateHoliday = utcToZonedTime(new Date(holiday), timezone);
    const gmt = format(dateHoliday, 'zzz').substr(-2);
    const oposegmt = -1 * parseInt(gmt);
    dateHoliday = utcToZonedTime(
      dateHoliday,
      `GMT${oposegmt < 0 ? '-' : '+'}${oposegmt}`,
    );
    if (holiday === '2020-12-08') {
      console.log('here');
    }
    return isSameDay(utc_date, dateHoliday);
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
  to_utc,
};
