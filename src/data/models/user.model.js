const connection = require('../connection')
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
    const usersFound = await connection.user.findMany({
      include: includesConfig
    })
    return usersFound
  }

  static async findManyWithoutIncludes() {
    const usersFound = await connection.user.findMany()
    return usersFound
  }

  static async updateManyTransfersForCloseWeek() {
      await connection.$executeRaw`UPDATE User SET transfers=IF(transfers = 1 or transfers = 2 or transfers = 3, 3, 2)`
  }

  static async findById(id) {
    const userFound = await connection.user.findFirst({
      where: {
        id
      },
      include: includesConfig
    })
    return userFound
  }

  static async findByEmail(email) {
    const userFound = await connection.user.findFirst({
      where: {
        email
      },
      include: includesConfig
    })
    return userFound
  }

  static async find(email, password) {
    const userFound = await connection.user.findFirst({
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
    const newUser = await connection.user.create({
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
    await connection.user.updateMany({
      where: {
        id: userId
      },
      data: {
        badPoints: 0
      }
    })
  }
}

module.exports = UserModel