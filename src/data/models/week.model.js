const prisma = require('../prisma')

class WeekModel {

  static async create() {
    return await prisma.week.create({
      data: {
        state: 'open'
      }
    })
  }

  static async findFirst() {
    return await prisma.week.findFirst()
  }

  static async findManySeasons() {
    return await prisma.season.findMany({
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
    })
  }

  static async updateStateWeek(id, state) {
    await prisma.week.update({
      where: {
        id
      },
      data: {
        state
      }
    })
  }

  static async createSeason(date) {
    return await prisma.season.create({
      data: {
        date
      }
    })
  }

  static async createPlayerStatistics(data) {
    return await prisma.playerSeason.createMany({
      data
    })
  }

  static async createTeamStatistics(data) {
    await prisma.teamSeason.createMany({
      data
    })
  }
}

module.exports = WeekModel