const WeekModel = require('../../data/models/week.model')

class ValidatorWeek {

  static async validateWeek(req, res, next) {
    const week = await WeekModel.findFirst()
    if (!week)
      return res.status(400).json({ message: 'La semana no existe' })
    req.body.week = week
    next()
  }

  static async validateOpen(req, res, next) {
    const { week } = req.body
    if (week.state !== 'open')
      return res.status(400).json({ message: 'La semana esta cerrada' })
    next()
  }

  static async validateClose(req, res, next) {
    const { week } = req.body
    if (week.state !== 'close')
      return res.status(400).json({ message: 'La semana esta abierta' })
    next()
  }

}

module.exports = ValidatorWeek