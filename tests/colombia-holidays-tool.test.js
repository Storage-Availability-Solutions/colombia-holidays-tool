//@ts-nocheck
const holidaysTool = require('../index');

describe('Funciones publicas',()=>{
    test('Obtener ultimo cuarto día laboral a partir del 2020-11-20 - Debería retornar 2020-11-13',()=>{
        let date = holidaysTool.get_N_working_day(4,utcdate(new Date('2020-11-20')));
        expect(date).toMatchObject(utcdate(new Date('2020-11-13')));
    });
    test('Obtener ultimo cuarto día laboral a partir del 2020-12-22 - Debería retornar 2020-12-18',()=>{
        let date = holidaysTool.get_N_working_day(2,utcdate(new Date('2020-12-22')));
        expect(date).toMatchObject(utcdate(new Date('2020-12-18')));
    });
    test('Obtener ultimo cuarto día laboral a partir del 2020-01-22 - Debería retornar 2020-01-16',()=>{
        let date = holidaysTool.get_N_working_day(4,utcdate(new Date('2020-01-22')));
        expect(date).toMatchObject(utcdate(new Date('2020-01-16')));
    });
    test('Obtener ultimo segundo día laboral a partir del 2020-01-22 - Debería retornar 2020-01-20',()=>{
        let date = holidaysTool.get_N_working_day(2,utcdate(new Date('2020-01-22')));
        expect(date).toMatchObject(utcdate(new Date('2020-01-20')));
    });
    test('La fecha 2020-11-16 es un día laboral? - Debería retornar true',()=>{
        let is_holiday = holidaysTool.is_holiday(utcdate(new Date('2020-11-16')));
        expect(is_holiday).toBe(true);
    });
})

function utcdate(date){
    return holidaysTool.to_UTC(date);
}