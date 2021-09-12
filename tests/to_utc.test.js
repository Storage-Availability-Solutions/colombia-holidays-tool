const {to_utc} = require('../index');
const {isSameDay} = require('date-fns');
const testDates = require('../mocks/dates');

describe('to utc', () => {
  it('Test 2020-12-08 06:00:00 Colombian Date - Should return 2020-12-08 06:00:00 UTC', () => {
    const tmzDate = to_utc(new Date(testDates.holidayAmericaBogota));
    const toBeDate = to_utc(new Date(testDates.holidayAmericaBogota), 'GMT');
    expect(isSameDay(tmzDate, toBeDate)).toBe(true);
  });
  it('Test 2020-12-08 00:00:00 Colombian Date - Should return 2020-12-08 00:00:00 UTC', () => {
    const tmzDate = to_utc(new Date(testDates.holidayGMT));
    const toBeDate = to_utc(new Date(testDates.holidayGMT), 'GMT');
    expect(isSameDay(tmzDate, toBeDate)).toBe(true);
  });
});
