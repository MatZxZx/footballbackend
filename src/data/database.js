const connection = require('./connection')

class DataBase {

  async createUser({ email, username, password, teamname }) {
    const user = connection.user.create({
      data: {
        email,
        username,
        password,
        budget: 0,
        team: {
          create: {
            teamname,
            banking: {
              create: {

              }
            }
          }
        }
      },
      include: {
        team: {
          include: {
            banking: {

            }
          }
        }
      }
    })
    return user
  }

  async getUsers() {
    return await connection.user.findMany()
  }

  async getUserById(id) {
    return await connection.user.findFirst({
      where: {
        id
      },
      include: {
        team: {
          include: {
            banking: true
          }
        }
      }
    })
  }

  async getUserByEmail(email) {
    return await connection.user.findFirst({
      where: {
        email
      },
      include: {
        team: {
          include: {
            banking: true
          }
        }
      }
    })
  }

  async createPlayer({ name, lastname, position, points, price }) {
    const player = await connection.player.create({
      data: {
        name,
        lastname,
        position,
        points,
        price
      }
    })
    return player
  }

  async deletePlayerById(id) {
    const playerDeleted = await connection.player.delete({
      where: {
        id
      }
    })
    return playerDeleted
  }

  async getPlayers() {
    return await connection.player.findMany()
  }

  async getPlayerById(id) {
    return await connection.player.findFirst({
      where: {
        id
      }
    })
  }

  async getTeams() {
    return await connection.team.findMany()
  }

  async getTeamById(id) {
    return await connection.team.findFirst({
      where: {
        id
      },
      include: {
        banking: {
          include: {
            players: {
              include: {
                player: true
              }
            }
          }
        },
        players: {
          include: {
            player: true
          }
        },
        captain: true
      }
    })
  }

  async getPlayersByTeamId(teamId) {
    const team = await this.getTeamById(teamId)
    const playersOnBanking = team.banking.players
    const playersOnTeam = team.players
    return { team: playersOnTeam, banking: playersOnBanking}
  }

  async createTeamPlayer({ teamId, playerId }) {
    await connection.teamPlayer.create({
      data: {
        teamId,
        playerId
      }
    })
  }

  async createBankingPlayer({ bankingId, playerId }) {
    await connection.bankingPlayer.create({
      data: {
        bankingId,
        playerId
      }
    })
  }

  async getBankingByTeamId(teamId) {
    const banking = await connection.banking.findFirst({
      where: {
        team: {
          id: teamId
        }
      }
    })
    return banking
  }

  async updateCaptainByTeamId({ teamId, captainId }) {
    await connection.team.update({
      data: {
        captainId
      },
      where: {
        id: teamId
      }
    })
    const newTeam = await this.getTeamById(teamId)
    return newTeam
  }

  async updatePlayerOnBakingToTeamByTeamId({ teamId, playerOnBankingId, playerOnTeamId }) {
    const banking = await this.getBankingByTeamId(teamId)
    const bankingId = banking.id
    await connection.bankingPlayer.update({
      data: {
        playerId: playerOnTeamId
      },
      where: {
        playerId_bankingId: {
          playerId: playerOnBankingId,
          bankingId
        }
      }
    })
    await connection.teamPlayer.update({
      data: {
        playerId: playerOnBankingId
      },
      where: {
        playerId_teamId: {
          playerId: playerOnTeamId,
          teamId
        }
      }
    })
    const newTeam = await this.getTeamById(teamId)
    return newTeam
  }

  async getPlayerByTeamId({ teamId, playerId }) {
    const player = await connection.player.findFirst({
      where: {
        teams: {
          some: {
            teamId,
            playerId
          }
        }
      }
    })
    return player
  }

  async getPlayerByBankingId({ bankingId, playerId }) {
    const player = await connection.player.findFirst({
      where: {
        bankings: {
          some: {
            bankingId,
            playerId
          }
        }
      }
    })
    return player
  }
}

module.exports = new DataBase()