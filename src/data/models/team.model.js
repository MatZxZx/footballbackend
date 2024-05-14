const prisma = require('../connection')

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

  static async createAlignPlayer({ alignId, playerId, order }) {
    await prisma.alignPlayer.create({
      data: {
        alignId,
        playerId,
        order
      }
    })
  }

  static async createBankingPlayer({ bankingId, playerId, order }) {
    await prisma.bankingPlayer.create({
      data: {
        bankingId,
        playerId,
        order
      }
    })
  }

  static async findById(id) {
    return await prisma.team.findFirst({
      where: {
        id
      },
      include: configInclude
    })
  }

  static async findManyAlignPlayer({ alignId }) {
    return await prisma.alignPlayer.findMany({
      where: {
        alignId
      },
      include: {
        player: true
      }
    })
  }

  static async findManyBankingPlayer({ bankingId }) {
    return await prisma.bankingPlayer.findMany({
      where: {
        bankingId
      },
      include: {
        player: true
      }
    })
  }

  static async deleteBankingPlayer({ bankingId, playerId }) {
    await prisma.bankingPlayer.delete({
      where: {
        playerId_bankingId: {
          bankingId,
          playerId
        }
      }
    })
  }

  static async updateOrderAlignPlayer({ alignId, playerId, order }) {
    await prisma.alignPlayer.update({
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
    await prisma.bankingPlayer.update({
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
    await prisma.alignPlayer.update({
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
    await prisma.bankingPlayer.update({
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
    const newTeam = await prisma.team.update({
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
    await prisma.team.updateMany({
      data: {
        badPoints: 0
      }
    })
  }  
}

module.exports = TeamModel