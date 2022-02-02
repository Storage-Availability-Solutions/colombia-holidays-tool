//@ts-nocheck
const testDates = require('../mocks/dates');
const spacetime = require('spacetime');
const {isSameDay} = require('date-fns');
const {isHoliday, getClosestWorkDay, addBussinessDays} = require('..');

describe('isHoliday', () => {
  it('Test 8th december 2021 holiday - Should return true', () => {
    const date = testDates.holidayGMT;
    const holiday = isHoliday(date);
    expect(holiday).toBe(true);
  });
  it('Test 10 September 2021 not holiday - Should return false ', () => {
    const holiday = isHoliday(testDates.notHoliday);
    expect(holiday).toBe(false);
  });
  it('Test 19 July 2021 not holiday - Should return false', () => {
    const holiday = isHoliday(testDates.mondayWithHolidayOnTuesday);
    expect(holiday).toBe(false);
  });
  it('Test 10th January 2021 sunday - Should return true', () => {
    const holiday = isHoliday(testDates.sundayWithHolidayOnMonday);
    expect(holiday).toBe(true);
  });
  it('Test 11th december 2021 holiday - Should return true', () => {
    const date = new Date('2021-12-11');
    const holiday = isHoliday(date);
    expect(holiday).toBe(true);
  });
  it('Test 12th december 2021 holiday - Should return true', () => {
    const date = new Date('2021-12-12');
    const holiday = isHoliday(date);
    expect(holiday).toBe(true);
  });
});

describe('getClosestWorkDay', () => {
  it('Get closest positive work day from 19/07/2021 - Should return 21/07/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.mondayWithHolidayOnTuesday,
    );
    const expected = toColombianTimezoneDate(new Date('2021-07-21'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest negative work day from 19/07/2021 - Should return 16/07/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.mondayWithHolidayOnTuesday,
      '-',
    );
    const expected = toColombianTimezoneDate(new Date('2021-07-16'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest positive work day from 10/01/2021 - Should return 12/01/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.sundayWithHolidayOnMonday,
    );
    const expected = toColombianTimezoneDate(new Date('2021-01-12'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest negative work day from 10/01/2021 - Should return 08/01/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.sundayWithHolidayOnMonday,
      '-',
    );
    const expected = toColombianTimezoneDate(new Date('2021-01-08'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest positive work day from 31/12/2021 - Should return 03/01/2022', () => {
    const closestWorkDay = getClosestWorkDay(new Date('2021-12-31 10:00:00'));
    const expected = toColombianTimezoneDate(new Date('2022-01-03'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest negative work day from 31/12/2021 - Should return 30/12/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      new Date('2021-12-31 10:00:00'),
      '-',
    );
    const expected = toColombianTimezoneDate(new Date('2021-12-30'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest negative work day from 11/12/2021 - Should return 10/12/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      new Date('2021-12-11 10:00:00'),
      '-',
    );
    const expected = toColombianTimezoneDate(new Date('2021-12-10'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest positive work day from 11/12/2021 - Should return 13/12/2021', () => {
    const closestWorkDay = getClosestWorkDay(new Date('2021-12-11 10:00:00'));
    const expected = toColombianTimezoneDate(new Date('2021-12-13'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest positive work day from 31/01/2022 - Should return 01/02/2022', () => {
    const closestWorkDay = getClosestWorkDay(new Date('2022-01-31 10:00:00'));
    const expected = toColombianTimezoneDate(new Date('2022-02-01'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Get closest negative work day from 31/01/2022 - Should return 28/01/2022', () => {
    const closestWorkDay = getClosestWorkDay(
      new Date('2022-01-31 10:00:00'),
      '-',
    );
    const expected = toColombianTimezoneDate(new Date('2022-01-28'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
});

describe('addBussinessDays', () => {
  it('Add 2 work days to 19/07/2021 - Should return 22/07/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.mondayWithHolidayOnTuesday,
      2,
    );
    const expected = toColombianTimezoneDate(new Date('2021-07-22'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Substract 2 work days to 19/07/2021 - Should return 15/07/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.mondayWithHolidayOnTuesday,
      -2,
    );
    const expected = toColombianTimezoneDate(new Date('2021-07-15'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Add 3 work days to 10/01/2021 - Should return 14/01/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.sundayWithHolidayOnMonday,
      3,
    );
    const expected = toColombianTimezoneDate(new Date('2021-01-14'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Substract 3 work days to 10/01/2021 - Should return 6/01/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.sundayWithHolidayOnMonday,
      -3,
    );
    const expected = toColombianTimezoneDate(new Date('2021-01-06'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Substract 3 work days to 30/12/2021 - Should return 27/12/2021', () => {
    const closestWorkDay = addBussinessDays(
      new Date('2021-12-30 10:00:00'),
      -3,
    );
    const expected = toColombianTimezoneDate(new Date('2021-12-27'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Add 3 work days to 31/12/2021 - Should return 05/01/2022', () => {
    const closestWorkDay = addBussinessDays(new Date('2021-12-31'), 3);
    const expected = toColombianTimezoneDate(new Date('2022-01-05'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Add 1 work day to 11/12/2021 - Should return 13/12/2021', () => {
    const closestWorkDay = addBussinessDays(new Date('2021-12-11 5:00:00'), 1);
    const expected = toColombianTimezoneDate(new Date('2021-12-13'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Add 1 work day to 31/01/2022 - Should return 01/02/2022', () => {
    const closestWorkDay = addBussinessDays(new Date('2022-01-31'), 1);
    const expected = toColombianTimezoneDate(new Date('2022-02-01'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
  it('Substract 1 work day to 31/01/2022 - Should return 28/01/2022', () => {
    const closestWorkDay = addBussinessDays(new Date('2022-01-31'), -1);
    const expected = toColombianTimezoneDate(new Date('2022-01-28'));
    expect(isSameDay(closestWorkDay, expected.d)).toEqual(true);
  });
});

const toColombianTimezoneDate = date => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return spacetime(`${year}-${month}-${day}`, 'America/Bogota');
};
