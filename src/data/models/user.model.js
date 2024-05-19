const prisma = require('../connection')
const bcrypt = require('bcryptjs')

const includesConfig = {
  team: {
    include: {
      players: {
        include: {
          player: true
        }
      }
    }
  }
}

class UserModel {

  static async findMany() {
    return await prisma.user.findMany({
      include: includesConfig
    })
  }

  static async findManyWithoutIncludes() {
    return await prisma.user.findMany()
  }

  static async updateManyTransfersForCloseWeek() {
    await prisma.$executeRaw`UPDATE User SET transfers=IF(transfers = 1 or transfers = 2 or transfers = 3, 3, 2)`
  }

  static async findById(id) {
    return await prisma.user.findFirst({
      where: {
        id
      },
      include: includesConfig
    })
  }

  static async findByEmail(email) {
    return await prisma.user.findFirst({
      where: {
        email
      },
      include: includesConfig
    })
  }

  static async find(email, password) {
    const userFound = await prisma.user.findFirst({
      where: {
        email
      },
      include: includesConfig
    })
    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password)
      return { userFound, isMatch }
    }
    return { userFound }
  }

  static async create(email, username, password, teamname) {
    const encrypt = await bcrypt.hash(password, 10)
    return await prisma.user.create({
      data: {
        email,
        username,
        password: encrypt,
        budget: 100,
        transfers: 2,
        willCard: 1,
        willCardActive: false,
        team: {
          create: {
            teamname
          }
        }
      },
      include: includesConfig
    })
  }

  static async updateBudget({ userId, price }) {
    await prisma.$executeRaw`UPDATE User SET budget = budget - ${price} WHERE id = ${userId}`
  }

  static async findManyWeeks({ teamId }) {
    return await prisma.teamSeason.findMany({
      where: {
        teamId: teamId
      },
      include: {
        season: true
      }
    })
  }

  static async createValoration({ userId, playerId, valoration }) {
    await connection.userPlayer.create({
      data: {
        userId,
        playerId,
        valoration
      }
    })
  }

  static async updateValoration({ userId, playerId, valoration }) {
    return await connection.userPlayer.update({
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
}

module.exports = UserModel