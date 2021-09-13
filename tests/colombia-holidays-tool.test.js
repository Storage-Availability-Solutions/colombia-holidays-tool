//@ts-nocheck
const testDates = require('../mocks/dates');
const {utcToZonedTime} = require('date-fns-tz');
const {isSameDay} = require('date-fns');
const {isHoliday, getClosestWorkDay, addBussinessDays} = require('../index');

describe('isHoliday', () => {
  it('Test 8th december 2021 holiday - Should return true', () => {
    const date = utcToZonedTime(new Date(testDates.holidayGMT), 'Etc/UTC');
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
});

describe('getClosestWorkDay', () => {
  it('Get closest positive work day from 19/07/2021 - Should return 21/07/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.mondayWithHolidayOnTuesday,
    );
    const expected = utcToZonedTime(new Date('2021-07-21'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Get closest negative work day from 19/07/2021 - Should return 16/07/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.mondayWithHolidayOnTuesday,
      '-',
    );
    const expected = utcToZonedTime(new Date('2021-07-16'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Get closest positive work day from 10/01/2021 - Should return 12/01/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.sundayWithHolidayOnMonday,
    );
    const expected = utcToZonedTime(new Date('2021-01-12'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Get closest negative work day from 10/01/2021 - Should return 08/01/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      testDates.sundayWithHolidayOnMonday,
      '-',
    );
    const expected = utcToZonedTime(new Date('2021-01-08'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Get closest positive work day from 31/12/2021 - Should return 03/01/2022', () => {
    const closestWorkDay = getClosestWorkDay(new Date('2021-12-31 10:00:00'));
    const expected = utcToZonedTime(new Date('2022-01-03'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Get closest negative work day from 31/12/2021 - Should return 30/12/2021', () => {
    const closestWorkDay = getClosestWorkDay(
      new Date('2021-12-31 10:00:00'),
      '-',
    );
    const expected = utcToZonedTime(new Date('2021-12-30'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
});

describe('addBussinessDays', () => {
  it('Add 2 work days to 19/07/2021 - Should return 22/07/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.mondayWithHolidayOnTuesday,
      2,
    );
    const expected = utcToZonedTime(new Date('2021-07-22'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Substract 2 work days to 19/07/2021 - Should return 15/07/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.mondayWithHolidayOnTuesday,
      -2,
    );
    const expected = utcToZonedTime(new Date('2021-07-15'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Add 3 work days to 10/01/2021 - Should return 14/01/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.sundayWithHolidayOnMonday,
      3,
    );
    const expected = utcToZonedTime(new Date('2021-01-14'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Substract 3 work days to 10/01/2021 - Should return 6/01/2021', () => {
    const closestWorkDay = addBussinessDays(
      testDates.sundayWithHolidayOnMonday,
      -3,
    );
    const expected = utcToZonedTime(new Date('2021-01-06'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Substract 3 work days to 30/12/2021 - Should return 27/12/2021', () => {
    const closestWorkDay = addBussinessDays(
      new Date('2021-12-30 10:00:00'),
      -3,
    );
    const expected = utcToZonedTime(new Date('2021-12-27'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
  it('Add 3 work days to 31/12/2021 - Should return 04/01/2022', () => {
    const closestWorkDay = addBussinessDays(new Date('2021-12-31 10:00:00'), 3);
    const expected = utcToZonedTime(new Date('2022-01-04'), 'Etc/UTC');
    expect(isSameDay(closestWorkDay, expected)).toEqual(true);
  });
});
