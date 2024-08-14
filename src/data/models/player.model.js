const { getPlayerPoints } = require('../../domain/helpers/player.helpers')
const prisma = require('../prisma')

class PlayerModel {

  static async create({ name, lastname, position, price }) {
    return await prisma.player.create({
      data: {
        name,
        lastname,
        position,
        price
      }
    })
  }

  static async findMany() {
    return await prisma.player.findMany({
      include: {
        valorations: true
      }
    })
  }

  static async findById(id) {
    const playerFound = await prisma.player.findFirst({
      where: {
        id
      },
      include: {
        valorations: true
      }
    })
    return playerFound
  }

  static async updateStatistics({ id, goals, assists, locks, present, goalAgainst, missedPenalty, interception, savedPenalty, criminalCommitted, emptyGoal, goalsConceded }) {
    await prisma.player.update({
      where: {
        id
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
  }

  static async resetStatistics() {
    await prisma.player.updateMany({
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
        goalsConceded: 0,
        timesBought: 0
      }
    })
  }

  static async updateTimesBought({ id }) {
    await prisma.player.update({
      where: {
        id
      },
      data: {
        timesBought
      }
    })
  }

  static async findFourBestPlayersLastWeek() {
    const seasons = await prisma.season.findMany()
    if (!seasons.length)
      return []
    const lastSeason = seasons[seasons.length - 1]
    const playersLastseason = await prisma.playerSeason.findMany({
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

  static async findManyOfLastweek() {
    const seasons = await prisma.season.findMany()
    if (!seasons.length) {
      return []
    }
    const players = await prisma.playerSeason.findMany({
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

  static async findValoration({ userId, playerId }) {
    return await prisma.userPlayer.findFirst({
      where: {
        playerId,
        userId
      }
    })
  }

  static async createValoration({ userId, playerId, valoration }) {
    return await prisma.userPlayer.create({
      data: {
        userId,
        playerId,
        valoration
      }
    })
  }

  static async updateValoration({ userId, playerId, valoration }) {
    return await prisma.userPlayer.update({
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
  }

  static async updateManyPrice() {
    const players = await this.findMany()
    // console.log(players.map(p => getPlayerPoints(p) <= 6 ? 5 : Math.floor(getPlayerPoints(p) / 4)))
    console.log('Actualizando')
    await prisma.$transaction(players.map(p => {
      return prisma.player.update({
        data: {
          price: getPlayerPoints(p) <= 6 ? 5 : Math.floor(getPlayerPoints(p) / 4)
        },
        where: {
          id: p.id
        }
      })
    }))
    console.log('Actualizacion completa')
  }
}

module.exports = PlayerModel