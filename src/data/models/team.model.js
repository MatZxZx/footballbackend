const connection = require('../connection')

const configInclude = {
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

class TeamModel {

  static async findById(id) {
    const teamFound = await connection.team.findFirst({
      where: {
        id
      },
      include: configInclude
    })
    return teamFound
  }

  static async createAlignPlayer({ alignId, playerId, order }) {
    await connection.alignPlayer.create({
      data: {
        alignId,
        playerId,
        order
      }
    })
  }

  static async createBankingPlayer({ bankingId, playerId, order }) {
    await connection.bankingPlayer.create({
      data: {
        bankingId,
        playerId,
        order
      }
    })
  }

  static async findManyAlignPlayer({ alignId }) {
    const alignsPlayers = await connection.alignPlayer.findMany({
      where: {
        alignId
      },
      include: {
        player: true
      }
    })
    return alignsPlayers
  }

  static async findManyBankingPlayer({ bankingId }) {
    const bankingPlayers = await connection.bankingPlayer.findMany({
      where: {
        bankingId
      },
      include: {
        player: true
      }
    })
    return bankingPlayers
  }

  static async updateOrderAlignPlayer({ alignId, playerId, order }) {
    await connection.alignPlayer.update({
      where:{
        playerId_alignId: {
          alignId,
          playerId
        }
      },
      data: {
        order
      }
    })
  }

  static async updateOrderBankingPlayer({ bankingId, playerId, order }) {
    await connection.bankingPlayer.update({
      where:{
        playerId_bankingId: {
          bankingId,
          playerId
        }
      },
      data: {
        order
      }
    })
  }

  static async updatePlayerAlignPlayer({ alignId, playerOnAlignId, playerOnBankingId }) {
    await connection.alignPlayer.update({
      where:{
        playerId_alignId: {
          alignId,
          playerId: playerOnAlignId
        }
      },
      data: {
        playerId: playerOnBankingId
      }
    })
  }

  static async updatePlayerBankingPlayer({ bankingId, playerOnBankingId, playerOnAlignId }) {
    await connection.bankingPlayer.update({
      where:{
        playerId_bankingId: {
          bankingId,
          playerId: playerOnBankingId
        }
      },
      data: {
        playerId: playerOnAlignId
      }
    })
  }

  static async updateCaptain({ id, captainId }) {
    const newTeam = await connection.team.update({
      where: {
        id
      },
      data: {
        captainId
      },
      include: configInclude
    })
    return newTeam
  }

  static async resetBandPoints() {
    const cols = await connection.team.update({
      data: {
        badPoints: 0
      }
    })
    return cols
  }  
}

module.exports = TeamModel