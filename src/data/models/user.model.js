const prisma = require('../connection')
const bcrypt = require('bcryptjs')

const includesConfig = {
  team: {
    include: {
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
  }
}

class UserModel {

  static async findMany() {
    const usersFound = await prisma.user.findMany({
      include: includesConfig
    })
    return usersFound
  }

  static async findManyWithoutIncludes() {
    const usersFound = await prisma.user.findMany()
    return usersFound
  }

  static async updateManyTransfersForCloseWeek() {
    await prisma.$executeRaw`UPDATE User SET transfers=IF(transfers = 1 or transfers = 2 or transfers = 3, 3, 2)`
  }

  static async findById(id) {
    const userFound = await prisma.user.findFirst({
      where: {
        id
      },
      include: includesConfig
    })
    return userFound
  }

  static async findByEmail(email) {
    const userFound = await prisma.user.findFirst({
      where: {
        email
      },
      include: includesConfig
    })
    return userFound
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
    const newUser = await prisma.user.create({
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
            teamname,
            align: {
              create: {

              }
            },
            banking: {
              create: {

              }
            }
          }
        }
      },
      include: includesConfig
    })
    return newUser
  }

  static async resetBadPoints({ userId }) {
    await prisma.user.updateMany({
      where: {
        id: userId
      },
      data: {
        badPoints: 0
      }
    })
  }

  static async updateBudget({ userId, price }) {
    await prisma.$executeRaw`UPDATE User SET budget = budget - ${price} WHERE id = ${userId}`
  }

  static async findManyWeeks({ teamId }) {
    const weeks = await prisma.teamSeason.findMany({
      where: {
        teamId: teamId
      },
      include: {
        season: true
      }
    })
    return weeks
  }

  static async transactionPlayerToAlign({ userId, alignId, playerId, price, state }) {
    const updateTimesBought = prisma.$executeRaw`UPDATE Player SET timesBought = timesBought + 1 WHERE id = ${playerId}`
    const updateBudget = prisma.$executeRaw`UPDATE User SET budget = budget - ${price} WHERE id = ${userId}`
    let mainQuery
    switch (state.code) {
      case 0:
        mainQuery = prisma.alignPlayer.delete({
          where: {
            playerId_alignId: {
              alignId,
              playerId
            }
          }
        })
        break
      case 1:
        mainQuery = prisma.alignPlayer.update({
          where: {
            playerId_alignId: {
              alignId,
              playerId: state.playerToUpdate
            }
          },
          data: {
            playerId
          }
        })
        break
      case 2:
        mainQuery = prisma.alignPlayer.create({
          data: {
            alignId,
            playerId,
            order: state.order
          }
        })
        break
    }
    await prisma.$transaction([
      mainQuery,
      updateTimesBought,
      updateBudget
    ])
  }

  static async transactionPlayerToBanking({ userId, bankingId, playerId, price, state }) {
    const updateTimesBought = prisma.$executeRaw`UPDATE Player SET timesBought = timesBought + 1 WHERE id = ${playerId}`
    const updateBudget = prisma.$executeRaw`UPDATE User SET budget = budget - ${price} WHERE id = ${userId}`
    let mainQuery
    switch (state.code) {
      case 0:
        mainQuery = prisma.bankingPlayer.delete({
          where: {
            playerId_bankingId: {
              bankingId,
              playerId
            }
          }
        })
        break
      case 1:
        mainQuery = prisma.bankingPlayer.update({
          where: {
            playerId_bankingId: {
              bankingId,
              playerId: state.playerToUpdate
            }
          },
          data: {
            playerId
          }
        })
        break
      case 2:
        mainQuery = prisma.bankingPlayer.create({
          data: {
            bankingId,
            playerId,
            order: state.order
          }
        })
        break
    }
    await prisma.$transaction([
      mainQuery,
      updateTimesBought,
      updateBudget
    ])
  }
}

module.exports = UserModel