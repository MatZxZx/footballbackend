function getDateFormSeasonFormat() {
  const date = new Date()
  const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  return days[date.getDay()] + ', ' + date.toLocaleDateString()
}

module.exports = {
  getDateFormSeasonFormat
}