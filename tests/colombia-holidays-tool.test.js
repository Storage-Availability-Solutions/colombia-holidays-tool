//@ts-nocheck
const testDates = require('../mocks/dates');
const {isHoliday, getClosestWorkDay, addBussinessDays} = require('../index');

describe('isHoliday', () => {
  it('Test 8th december 2020 holiday - Should return true ', () => {
    const holiday = isHoliday(testDates.holiday);
    expect(holiday).toBe(true);
  });
  it('Test 10 september 2020 not holiday - Should return false ', () => {
    const holiday = isHoliday(testDates.notHoliday);
    expect(holiday).toBe(false);
  });
  it('Test 20 July 2020 not holiday - Should return false', () => {
    const holiday = isHoliday(testDates.mondayWithHolidayOnTuesday);
    console.log(testDates.mondayWithHolidayOnTuesday.getDate());
    expect(holiday).toBe(false);
  });
  it('Test 11th November 2020 sunday - Should return true', () => {
    const holiday = isHoliday(testDates.sundayWithHolidayOnMonday);
    expect(holiday).toBe(true);
  });
});

describe('getClosestWorkDay', () => {
  it('', () => {});
});

describe('addBussinessDays', () => {
  it('', () => {});
});
