const prisma = require('../prisma')
const bcrypt = require('bcryptjs')

const includesConfig = {
  team: {
    include: {
      players: {
        include: {
          player: {
            include: {
              valorations: true
            }
          }
        }
      }
    }
  }
}

// Adaptador de model a controller
function userToUserController(user) {
  if (!user)
    return user
  return {
    ...user,
    team: {
      ...user.team,
      players: user.team.players.map(p => ({
        ...p.player,
        isBanking: p.isBanking,
        order: p.order,
        isCaptain: p.isCaptain
      }))
    }
  }
}

class UserModel {

  static async findMany() {
    return (await prisma.user.findMany({
      include: includesConfig
    })).map(u => userToUserController(u))
  }

  static async findManyWithoutIncludes() {
    return await prisma.user.findMany()
  }

  static async updateManyTransfersForCloseWeek() {
    await prisma.$executeRaw`UPDATE User SET transfers=IF(transfers = 1 or transfers = 2 or transfers = 3, 3, 2)`
  }

  static async findById(id) {
    return userToUserController(await prisma.user.findFirst({
      where: {
        id
      },
      include: includesConfig
    }))
  }

  static async findByEmail(email) {
    return userToUserController(await prisma.user.findFirst({
      where: {
        email
      },
      include: includesConfig
    }))
  }

  static async find(email, password) {
    const userFound = userToUserController(await prisma.user.findFirst({
      where: {
        email
      },
      include: includesConfig
    }))
    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password)
      return { userFound, isMatch }
    }
    return { userFound }
  }

  static async create(email, username, password, teamname) {
    const encrypt = await bcrypt.hash(password, 10)
    return userToUserController(await prisma.user.create({
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
    }))
  }

  static async update({ id, budget, transfers, unlimitedTransfers }) {
    await prisma.user.update({
      where: {
        id
      },
      data: {
        budget,
        transfers,
        unlimitedTransfers
      }
    })
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
    await connection.userPlayer.update({
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