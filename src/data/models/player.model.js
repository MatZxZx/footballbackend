const connection = require('../connection')

class PlayerModel {

  static async create(name, lastname, position, price) {
    const newPlayer = await connection.player.create({
      data: {
        name,
        lastname,
        position,
        price,
        goals: 0,
        assists: 0,
        locks: 0
      },
      include: {
        valorations: true
      }
    })
    return newPlayer
  }

  static async findById(id) {
    const playerFound = await connection.player.findFirst({
      where: {
        id
      },
      include: {
        valorations: true
      }
    })
    return playerFound
  }

  static async findMany() {
    const playersFound = await connection.player.findMany({
      include: {
        valorations: true
      }
    })
    return playersFound
  }

  static async findValoration({ userId, playerId }) {
    const valoration = await connection.userPlayer.findFirst({
      where: {
        userId,
        playerId,
      }
    })
    return valoration
  }

  static async createValoration({ userId, playerId, valoration }) {
    const newValoration = await connection.userPlayer.create({
      data: {
        userId,
        playerId,
        valoration
      }
    })
    return newValoration
  }

  static async updateValoration({ userId, playerId, valoration }) {
    const updatedValoration = await connection.userPlayer.update({
      where: {
        userId_playerId: {
          userId,
          playerId
        }
      },
      data: {
        valoration
      }
    })
    return updatedValoration
  }

  static async updateStatistics({ playerId, goals, assists, locks, present, goalAgainst, missedPenalty, interception, savedPenalty, criminalCommitted, emptyGoal, goalsConceded }) {
    const updatedValoration = await connection.player.update({
      where: {
        id: playerId
      },
      data: {
        goals,
        assists,
        locks,
        present,
        goalAgainst,
        missedPenalty,
        interception,
        savedPenalty,
        criminalCommitted,
        emptyGoal,
        goalsConceded
      }
    })
    return updatedValoration
  }

  static async resetStatisc() {
    await connection.player.updateMany({
      data: {
        goals: 0,
        assists: 0,
        locks: 0,
        present: false,
        goalAgainst: 0,
        missedPenalty: 0,
        interception: 0,
        savedPenalty: 0,
        criminalCommitted: 0,
        emptyGoal: false,
        goalsConceded: 0
      }
    })
  }

  static async findManyStatisc({ playerId }) {
    const statistics = await connection.playerSeason.findMany({
      where: {
        playerId
      }
    })
    return statistics
  }

  static async findFourBestPlayersLastWeek() {
    const seasons = await connection.season.findMany()
    if (!seasons.length)
      return []
    const lastSeason = seasons[seasons.length - 1]
    const playersLastseason = await connection.playerSeason.findMany({
      where: {
        seasonId: lastSeason.id
      },
      include: {
        player: true
      }
    })
    if (!playersLastseason.length)
      return []
    playersLastseason.sort((a, b) => b.points - a.points)
    const players = []
    for (let i = 0; i < playersLastseason.length - 1; i++) {
      if (i > 3) break
      players.push(playersLastseason[i])
    }
    return players
  }

  static async updateTimesBought({ id, timesBought }) {
    await connection.player.update({
      where: {
        id
      },
      data: {
        timesBought
      }
    })
  }

  static async findManyOfLastweek() {
    const seasons = await connection.season.findMany()
    if (!seasons.length) {
      return []
    }
    const players = await connection.playerSeason.findMany({
      where: {
        seasonId: seasons[seasons.length - 1].id
      },
      include: {
        player: {
          include: {
            valorations: true
          }
        }
      }
    })
    return players.map(p => ({ ...p, player: { ...p.player, valorations: p.player.valorations.reduce((acum, v) => acum + v.valoration, 0) / p.player.valorations.length } }))
  }
}

module.exports = PlayerModel