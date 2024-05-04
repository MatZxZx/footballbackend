const connection = require('../connection')
const { getTeamSeason, getPlayerPoints } = require('../../domain/helpers/fun')

const configIncludeTeam = {
  captain: true,
  align: {
    include: {
      players: {
        include: {
          player: true
        }
      }
    }
  },
  banking: {
    include: {
      players: {
        include: {
          player: true
        }
      }
    }
  }
}

class WeekModel {

  static async create() {
    const week = await connection.week.create({
      data: {
        state: 'open'
      }
    })
    return week
  }

  static async findFirst() {
    const weekFound = await connection.week.findFirst()
    return weekFound
  }

  static async updateStateWeek(id, state) {
    const updatedWeek = await connection.week.update({
      where: {
        id
      },
      data: {
        state
      }
    })
    return updatedWeek
  }

  static async createSeason({ date }) {
    const season = connection.season.create({
      data: {
        date
      }
    })
    return season
  }

  static async createStatisc({ seasonId }) {
    const players = await connection.player.findMany()
    const playerSeasens = players.map(p => {
      return {
        seasonId,
        playerId: p.id,
        goals: p.goals,
        assists: p.assists,
        locks: p.locks,
        present: p.present,
        goalAgainst: p.goalAgainst,
        missedPenalty: p.missedPenalty,
        interception: p.interception,
        savedPenalty: p.savedPenalty,
        criminalCommitted: p.criminalCommitted,
        empetyGoal: p.empetyGoal,
        goalsConceded: p.goalsConceded,
        points: getPlayerPoints(p)
      }
    })
    const playersSeason = await connection.playerSeason.createMany({
      data: playerSeasens
    })
    return playersSeason
  }

  // Por hacer -> nashe
  static async createTeams({ seasonId }) {
    const teams = await connection.team.findMany({
      include: configIncludeTeam
    })
    const teamSeason = getTeamSeason({ seasonId, teams })

    // const res = await connection.teamSeason.createMany({
    // data: teamsFormat
    // })

    console.log(teamSeason)
  }
}

module.exports = WeekModel