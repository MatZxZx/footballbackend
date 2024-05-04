const WeekModel = require('../../data/models/week.model')
const UserModel = require('../../data/models/user.model')
const PlayerModel = require('../../data/models/player.model')
const TeamModel = require('../../data/models/team.model')
const { getDateFormSeasonFormat } = require('../helpers/date')


async function postWeek(req, res) {
  const weekFound = await WeekModel.findFirst()
  if (weekFound)
    return res.status(400).json({ message: 'La semana ya existe, solo puede existir una semana' })
  const week = await WeekModel.create()
  return res.json(week)
}

function putOpenWeek(valueState) {
  return async (req, res) => {
    const weekFound = await WeekModel.findFirst()
    if (!weekFound)
      return res.status(400).json({ message: 'La semana no esta creada' })

    if (valueState === 'close') {
      try {
        await UserModel.updateManyTransfersForCloseWeek()
        const date = getDateFormSeasonFormat()
        const season = await WeekModel.createSeason({ date })
        await WeekModel.createStatisc({ seasonId: season.id })
        await PlayerModel.resetStatisc()

        await WeekModel.createTeams({ seasonId: season.id })
        await TeamModel.resetBandPoints()

      } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Error inesperado' })
      }
    }
    
    const updatedWeek = await WeekModel.updateStateWeek(weekFound.id, valueState)
    return res.json(updatedWeek)
  }
}

module.exports = {
  postWeek,
  putOpenWeek
}