const WeekModel = require('../../data/models/week.model')
const UserModel = require('../../data/models/user.model')
const TeamModel = require('../../data/models/team.model')
const PlayerModel = require('../../data/models/player.model')
const { getSeasonDate } = require('../helpers/week.helpers')
const { getPlayerPoints } = require('../helpers/player.helpers')

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

  /*
    Al cerrar la semana se actualizan las transferencias de todos los jugadores.
    Creamos una nueva temporada
    Creamos las estadisticas de los jugadores para la nueva temporada
    Reseteamos las estadisticas de todos los jugadores
    Creamos las estadisticas de los equipos para la nueva temporada
    Reseteamos los puntos malos
    Actualizamos el estado de la semana a "cerrado"

    Por hacer: actualizar el precio de los jugadores segun sus puntos y las transferencias
  */
  static async putToClose(req, res) {
    const { week } = req.body
    try {
      await UserModel.updateManyTransfersForCloseWeek()
      const season = await WeekModel.createSeason(getSeasonDate()) // Le pasamos la fecha actual
      const players = await PlayerModel.findMany()
      const statistics = players.map(p => ({
        playerId: p.id,
        seasonId: season.id,
        goals: p.goals,
        assists: p.assists,
        locks: p.locks,
        present: p.present,
        goalAgainst: p.goalAgainst,
        missedPenalty: p.missedPenalty,
        criminalCommitted: p.criminalCommitted,
        goalsConceded: p.goalsConceded,
        interception: p.interception,
        savedPenalty: p.savedPenalty,
        emptyGoal: p.emptyGoal,
        timesBought: p.timesBought
      }))
      await WeekModel.createPlayerStatistics(statistics)
      await PlayerModel.resetStatistics()
      const teams = await TeamModel.findMany()
      const teamsFormat = teams.map(t => {
        const teamStatistics = {
          goals: 0,
          assists: 0,
          locks: 0,
          goalAgainst: 0,
          missedPenalty: 0,
          criminalCommitted: 0,
          goalsConceded: 0,
          interception: 0,
          savedPenalty: 0,
          points: 0
        }
        t.players.forEach(teamPlayer => {
          teamStatistics.goals += teamPlayer.player.goals
          teamStatistics.assists += teamPlayer.player.goals
          teamStatistics.locks += teamPlayer.player.locks
          teamStatistics.goalAgainst += teamPlayer.player.goalAgainst
          teamStatistics.missedPenalty += teamPlayer.player.missedPenalty
          teamStatistics.criminalCommitted += teamPlayer.player.criminalCommitted
          teamStatistics.goalsConceded += teamPlayer.player.goalsConceded
          teamStatistics.interception += teamPlayer.player.interception
          teamStatistics.savedPenalty += teamPlayer.player.savedPenalty
          teamStatistics.points += getPlayerPoints(teamPlayer.player)
        })
        return {
          teamId: t.id,
          seasonId: season.id,
          ...teamStatistics
        }
      })
      await WeekModel.createTeamStatistics(teamsFormat)
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