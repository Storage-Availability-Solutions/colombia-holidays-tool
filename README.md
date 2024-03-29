<a name="module_colombia-holidays-tool"></a>

# colombia-holidays-tool
 
## Tabla de contenidos

1. [Introducción]
2. [Instalación]
3. [Documentación]
    * _[is_holiday]_
    * _[get_closest_work_day]_
    * _[get_N_working_day]_
4. [Changelog]
5. [Authors]

<a name="introduction"></a>

## Introducción

Herramienta que ayuda con el calculo de días laborales en Colombia, incluyendo días festivos.

<a name="instalation"></a>

## Instalación

Para instalar el módulo por favor use el comando:

```bash
npm install colombia-holidays-tool
```

Para usar el módulo, solo se requiere importarlo.

```javascript
const holidaysTool = require('colombia-holidays-tool');
```

<a name="documentation"></a>

## Documentación

<a name="function_is_holiday"></a>

### _isHoliday(date)_ ⇒ <code>Boolean</code>

Retorna si la fecha ingresada es un día de descanso o no; Se incluyen festivos y se toma el sábado como día de descanso.

**Kind**: Inner method of <code>[colombia-holidays-tool](#module_colombia-holidays-tool)</code>  
**Returns**: <code>Boolean</code> - Es un día de descanso o no.

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Fecha a saber si es un día de descanso o no.|

**Ejemplo**

```javascript
let fecha = holidaysTool.to_utc(new Date());
// Sun Nov 29 2020 16:00:00 GMT-0500 (hora estándar de Colombia)
let holiday = holidaysTool.isHoliday(fecha);
//true
```

<a name="function_get_closest_work_day"></a>

### _getClosestWorkDay(date,direction<code>?</code>)_ ⇒ <code>Date</code>

Retorna el día laboral más cercano a una fecha.

**Kind**: Inner method of <code>[colombia-holidays-tool](#module_colombia-holidays-tool)</code>  
**Returns**: <code>Date</code> - Día laboral más cercano.

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Fecha a calcular el día laboral más cercano.|
| direction| <code>+, -</code> | Calcular el día laboral más cercano anterior o posterior; Por defecto es el día posterior más cercano (+).|

**Ejemplo**

```javascript
let fecha = holidaysTool.to_utc(new Date());
// Sun Nov 29 2020 16:00:00 GMT-0500 (hora estándar de Colombia)

let diaAnterior = holidaysTool._getClosestWorkDay(fecha,'-');
// Fri Nov 27 2020 16:00:00 GMT-0500 (hora estándar de Colombia)

let diaPosterior = holidaysTool._getClosestWorkDay(fecha);
// Mon Nov 30 2020 16:00:00 GMT-0500 (hora estándar de Colombia)
```

<a name="function_get_N_working_day"></a>

### _addBussinessDays(date,amount)_ ⇒ <code>Date</code>

Suma o resta _n_ dias laborales.

**Kind**: Inner method of <code>[colombia-holidays-tool](#module_colombia-holidays-tool)</code>  
**Returns**: <code>Date</code> - Fecha despues de sumar o restar los días laborales.

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Fecha a calcular.|
| amount|<code>number</code> | Cantidad de días a sumar o restar.|

**Ejemplo**

```javascript
let fecha = holidaysTool.to_UTC(new Date());
// Tue Nov 17 2020 16:00:00 GMT-0500 (hora estándar de Colombia)

/**
 * Se calculan 4 días laborales antes
 * a partir de la fecha ingresada
 */
let diaAnterior = holidaysTool.get_N_working_day(4,fecha);
// Tue Nov 9 2020 16:00:00 GMT-0500 (hora estándar de Colombia)

/**
 * Se calculan 2 días laborales
 * posteriores de la fecha ingresada
 */
let diaPosterior = holidaysTool.get_N_working_day(2,fecha,'+');
// Fri Nov 20 2020 16:00:00 GMT-0500 (hora estándar de Colombia)
```

# [Changelog]

El changelog del projecto puede encontrarse en el archivo [CHANGELOG.md] en la ruta principal de este repositorio.

<a name="authors"></a>

# Authors

1. **Esteban Vanegas. [@esvanegas](https://github.com/esvanegas)**

<br>

_*Made with ❤️ at Storage Availability Solutions*_

[Introducción]: #introduction
[Instalación]: #instalation
[Documentación]: #documentation
[is_holiday]:#function_is_holiday
[get_closest_work_day]:#function_get_closest_work_day
[get_N_working_day]:#function_get_N_working_day
[Changelog]: ./CHANGELOG.md
[CHANGELOG.md]: ./CHANGELOG.md
[Authors]:#authors