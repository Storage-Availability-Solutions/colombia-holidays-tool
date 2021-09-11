'use strict';
const nequiHolidays = require('colombia-holidays');

/**
 * Modulo que ayuda con el calculo de días laborales en colombia
 *
 * @module colombia-holidays-tool
 * @author @esvanegas <esteban.vanegas@sasnw.com>
 * @version 1.0.0
 * @since 1.0.0
 */
module.exports = {
  is_holiday: is_holiday,
  get_closest_work_day: get_closest_work_day,
  get_N_working_day: get_N_working_day,
  to_UTC: to_UTC,
};

/**
 * Verifica si una fecha es un día laboral o no.
 * Se tiene en cuenta que un sabado corresponde a un día no laboral
 *
 * @function
 * @param {Date} date                  - Fecha a verificar
 * @returns {Boolean}                  - Es un día laboral o no
 */
function is_holiday(date) {
  let datetemp = new Date(date);
  let holidays = nequiHolidays.getColombiaHolidaysByYear(
    datetemp.getFullYear(),
  );
  let result = holidays.filter(holiday => {
    let holidayDate = new Date(holiday.holiday);
    holidayDate.setDate(holidayDate.getDate() + 1);
    return (
      datetemp.getMonth() == holidayDate.getMonth() &&
      datetemp.getFullYear() == holidayDate.getFullYear() &&
      datetemp.getDate() == holidayDate.getDate()
    );
  });
  //Saturday, sunday or holiday
  return datetemp.getDay() == 6 || datetemp.getDay() == 0 || result.length > 0;
}

/**
 * Halla el día laboral colombiano más cercano a partir de una fecha.
 * Retorna la misma fecha si la fecha ingresada es un día laboral
 *
 * @function
 * @param {Date} date               - Fecha a obtener el día laboral más cercano
 * @param {'+'|'-'} increment       - Incremento negativo o positivo, si se quiere hallar el día laboral anterior o posterior a la fecha
 * @returns {Date}                  - Día laboral más cercano
 */
function get_closest_work_day(date, increment = '+') {
  let tempDate = new Date(date);
  while (is_holiday(tempDate)) {
    let number = parseInt(increment + (1).toString());
    tempDate.setDate(tempDate.getDate() + number);
  }
  return tempDate;
}

/**
 * Obtiene el n día laboral
 *
 * Si se tiene una fecha que cae un martes y se quieren calcular 4 días laborales anteriores
 * no se contarian los sabados, domingos y festivos
 *
 * @example <caption>Obtener los 4 días laborales anteriores a la fecha 2020-01-22</caption>
 * // 2020-01-19 es domingo, 2020-01-18 is sabado
 * // La función retornara la fecha 2020-01-16 como el cuarto día laboral anterior a la fecha 2020-01-22
 * let date = get_N_working_day(4,'2020-01-22','-');
 * date == '2020-01-16'
 * @param {Number} quantDays             - Cantidad de días a calcular
 * @param {Date} date                    - Fecha a calcular
 * @param {'+'|'-'} increment            - Incremento positivo o negativo, incremento positivo hallará fechas posteriores e incremento negativo hallará fechas anteriores
 * @returns {Date}                       - n avo Día laboral
 */
function get_N_working_day(quantDays, date, increment = '-') {
  let n_work_date = new Date(date);
  for (let i = quantDays; i > 0; i--) {
    n_work_date = get_closest_work_day(n_work_date, increment);
    let number = parseInt(increment + (1).toString());
    n_work_date.setDate(n_work_date.getDate() + number);
  }
  return get_closest_work_day(n_work_date, increment);
}

/**
 * Convierte una fecha a UTC
 *
 * @function
 * @param {Date} date               - Fecha a convertir en UTC
 * @returns {Date}                  - Fecha en formato UTC
 */
function to_UTC(date) {
  let noutc = new Date(date);
  let utcdate = new Date(noutc.getTime() + noutc.getTimezoneOffset() * 60000);
  return utcdate;
}
