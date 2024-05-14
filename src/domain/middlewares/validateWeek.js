const WeekModel = require('../../data/models/week.model')

async function validateWeek(req, res, next) {
  const week = await WeekModel.findFirst()
  if (!week)
    return res.status(400).json({ message: 'La no existe' })
  if (week.state === 'close')
    return res.status(400).json({ message: 'La semana esta cerrada' })
  next()
}

module.exports = validateWeek