function getDateFormSeasonFormat() {
  const date = new Date()
  return date.toLocaleDateString()
}

module.exports = {
  getDateFormSeasonFormat
}