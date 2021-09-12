//@ts-nocheck
const testDates = require('../mocks/dates');
const {isHoliday, getClosestWorkDay, addBussinessDays} = require('../index');

describe('isHoliday', () => {
  it('Test 8th december 2020 holiday - Should return true', () => {
    const holiday = isHoliday(testDates.holidayGMT);
    expect(holiday).toBe(true);
  });
  /*it('Test 10 september 2020 not holiday - Should return false ', () => {
    const holiday = isHoliday(testDates.notHoliday);
    expect(holiday).toBe(false);
  });
  it('Test 19 July 2020 not holiday - Should return false', () => {
    const holiday = isHoliday(testDates.mondayWithHolidayOnTuesday);
    expect(holiday).toBe(false);
  });
  it('Test 10th January 2020 sunday - Should return true', () => {
    const holiday = isHoliday(testDates.sundayWithHolidayOnMonday);
    expect(holiday).toBe(true);
  });*/
});

describe('getClosestWorkDay', () => {
  it('', () => {});
});

describe('addBussinessDays', () => {
  it('', () => {});
});
