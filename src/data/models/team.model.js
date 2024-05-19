const prisma = require('../connection')

const configInclude = {
  players: {
    player: true
  }
}

class TeamModel {

  static async resetBandPoints() {
    await prisma.team.updateMany({
      data: {
        badPoints: 0
      }
    })
  }

  static async createTeamPlayer({ data }) {
    await prisma.teamPlayer.createMany({
      data
    })
  }

  static async updateTeamsPlayers({ players }) {
    await prisma.$transaction(
      players.map(p => prisma.teamPlayer.update({
        where: {
          teamId_playerId: p.teamId_playerId          
        },
        data: {
          order: p.order,
          isCaptain: p.isCaptain,
          isBanking: p.isBanking
        }
      }))
    )
  }

  static async deleteTeamPlayer({ teamId }) {
    await prisma.teamPlayer.deleteMany({
      where: {
        teamId
      }
    })
  }
}

module.exports = TeamModel