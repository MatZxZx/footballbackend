const connection = require('./data/connection')


class Query {

  static async showUsers() {
    try {
      // console.log(result)
      console.log(await connection.user.findMany())
    } catch (e) {
      console.log(e)
    }
  }

  static async deleteUsers() {
    try {
      await connection.user.deleteMany()
      console.log('Usuarios borrados')
    } catch (e) {
      console.log(e)
    }
  }

  static async insertPlayers(players) {
    try {
      const res = await connection.player.createMany({
        data: players.map(p => ({ ...p, goals: 0, assists: 0, locks: 0 }))
      })
    } catch (e) {
      console.log(e)
    }
  }

  static async showPlayers() {
    try {
      console.log(await connection.player.findMany())
    } catch (e) {
      console.log(e)
    }
  }

  static async deletePlayers() {
    try {
      await connection.player.deleteMany()
      console.log('No se pudieron borar los usuarios')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Query