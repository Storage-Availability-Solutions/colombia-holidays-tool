<a name="module_colombia-holidays-tool"></a>

# colombia-holidays-tool
 
## Tabla de contenidos

1. [Introducción]
    * _[to_UTC]_
    * _[is_holiday]_
    * _[get_closest_work_day]_
    * _[get_N_working_day]_
2. [Instalación]
3. [Documentación]
4. [Changelog]

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

<a name="function_to_utc"></a>

### _to_UTC(date)_ ⇒ <code>Date</code>

Retorna la fecha en formato UTC pero con el timezone actual.

**Kind**: Inner method of <code>[colombia-holidays-tool](#module_colombia-holidays-tool)</code>  
**Returns**: <code>Date</code> - Fecha UTC conservando timezone.

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Fecha a convertir en UTC.|

**Ejemplo**

```javascript
let fecha = new Date();
// Sun Nov 29 2020 10:00:00 GMT-0500 (hora estándar de Colombia)
let utc = holidaysTool.to_UTC(fecha);
// Sun Nov 29 2020 16:00:00 GMT-0500 (hora estándar de Colombia)
```

<a name="function_is_holiday"></a>

### _is_holiday(date)_ ⇒ <code>Boolean</code>

Retorna si la fecha ingresada es un día de descanso o no; Se incluyen festivos y se toma el sábado como día de descanso.

**Kind**: Inner method of <code>[colombia-holidays-tool](#module_colombia-holidays-tool)</code>  
**Returns**: <code>Boolean</code> - Es un día de descanso o no.

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Fecha a saber si es un día de descanso o no.|

**Ejemplo**

```javascript
let fecha = holidaysTool.to_UTC(new Date());
// Sun Nov 29 2020 16:00:00 GMT-0500 (hora estándar de Colombia)
let holiday = holidaysTool.is_holiday(fecha);
//true
```

<a name="function_get_closest_work_day"></a>

### _get_closest_work_day(date,increment<code>?</code>)_ ⇒ <code>Date</code>

Retorna el día laboral más cercano a una fecha.

**Kind**: Inner method of <code>[colombia-holidays-tool](#module_colombia-holidays-tool)</code>  
**Returns**: <code>Date</code> - Día laboral más cercano.

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Fecha a calcular el día laboral más cercano.|
| increment<code>='+'</code> | <code>+ ó -</code> | Calcular el día laboral más cercano anterior o posterior; Por defecto es el día posterior más cercano (+).|

**Ejemplo**

```javascript
let fecha = holidaysTool.to_UTC(new Date());
// Sun Nov 29 2020 16:00:00 GMT-0500 (hora estándar de Colombia)

let diaAnterior = holidaysTool.get_closest_work_day(fecha,'-');
// Fri Nov 27 2020 16:00:00 GMT-0500 (hora estándar de Colombia)

let diaPosterior = holidaysTool.get_closest_work_day(fecha);
// Mon Nov 30 2020 16:00:00 GMT-0500 (hora estándar de Colombia)
```

<a name="function_get_N_working_day"></a>

### _get_N_working_day(quantDays,date,increment<code>?</code>)_ ⇒ <code>Date</code>

Retorna el _n_ día laboral anterior o posterior; Solo contando días laborales, no días de descanso.

**Kind**: Inner method of <code>[colombia-holidays-tool](#module_colombia-holidays-tool)</code>  
**Returns**: <code>Date</code> - _n_ día laboral según la fecha ingresada.

| Param | Type | Description |
| --- | --- | --- |
| quantDays | <code>Number</code> | _n_ número de día laborales.|
| date | <code>Date</code> | Fecha a calcular.|
| increment<code>='-'</code> | <code>+ ó -</code> | Incremento posterior (+) o anterior (-); Por defecto es un incremento anterior(-).|

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
[Introducción]: #introduction
[Instalación]: #instalation
[Documentación]: #documentation
[to_UTC]:#function_to_utc
[is_holiday]:function_is_holiday
[get_closest_work_day]:function_get_closest_work_day
[get_N_working_day]:function_get_N_working_day
[Changelog]: ./CHANGELOG.md