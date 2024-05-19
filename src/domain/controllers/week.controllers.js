const WeekModel = require('../../data/models/week.model')
const UserModel = require('../../data/models/user.model')
const PlayerModel = require('../../data/models/player.model')
const TeamModel = require('../../data/models/team.model')
const { getDateFormSeasonFormat } = require('../helpers/date')


class WeekController {

  static async postWeek(req, res) {
    try {
      const weekFound = await WeekModel.findFirst()
      if (weekFound)
        return res.status(400).json({ message: 'La semana ya existe, solo puede existir una semana' })
      await WeekModel.create()
      return res.sendStatus(200)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Error de servidor' })
    }
  }

  static async putToClose(req, res) {
    const { week } = req.body
    try {
      await UserModel.updateManyTransfersForCloseWeek()
      const date = getDateFormSeasonFormat()
      const season = await WeekModel.createSeason({ date })
      await WeekModel.createStatisc({ seasonId: season.id })
      await PlayerModel.resetStatistics()
      await WeekModel.createTeams({ seasonId: season.id })
      await TeamModel.resetBandPoints()
      await WeekModel.updateStateWeek(week.id, 'close')
      return res.sendStatus(200)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Error inesperado' })
    }
  }

  static async putToOpen(req, res) {
    const { week } = req.body
    try {
      await WeekModel.updateStateWeek(week.id, 'open')
      return res.sendStatus(200)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Error de servidor' })
    }
  }
}

module.exports = WeekController