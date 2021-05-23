export const calAge = (val) => {
    const age = `${calYear(val)}A ${calMonth(val)}M ${calDay(val)}D`
    return age
}
function calYear (birthday) {
const hoy = new Date()
const fechaNacimiento = new Date(birthday)
let ano = hoy.getFullYear() - fechaNacimiento.getFullYear()
const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
) {
    ano--
}
return ano
}
function calMonth (birthday) {
const hoy = new Date()
const fechaNacimiento = new Date(birthday)
const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
var meses = 0
if (diferenciaMeses < 0) {
    meses = 12 - (fechaNacimiento.getMonth() - hoy.getMonth())
    if (hoy.getDate() < fechaNacimiento.getDate()) {
    meses--
    }
} else if (diferenciaMeses > 0) {
    meses = diferenciaMeses
    if (hoy.getDate() < fechaNacimiento.getDate()) {
    meses--
    }
}
return meses
}
function calDay (birthday) {
const hoy = new Date()
const fechaNacimiento = new Date(birthday)
fechaNacimiento.setMinutes(fechaNacimiento.getMinutes() + fechaNacimiento.getTimezoneOffset())
const diferenciaDias = hoy.getDate() - fechaNacimiento.getDate()
var day = 0
if (diferenciaDias < 0) {
    day = 31 - (fechaNacimiento.getDate() - hoy.getDate())
} else {
    day = diferenciaDias
}
return day
}

export const calFpp = (val) => {
    var fum = new Date(val)
    fum.setMinutes(fum.getMinutes() + fum.getTimezoneOffset())
    fum.setDate(fum.getDate() + 7)
    fum.setMonth(fum.getMonth() - 3)
    fum.setFullYear(fum.getFullYear() + 1)
    return fum
}
