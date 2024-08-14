const playerInterface = require("./player.interface")

class TeamInterface {
  constructor(team) {
    this.id = team.id
    this.teamname = team.teamname
    this.players = team.players.map(p => ({ ...new playerInterface(p), isBanking: p.isBanking, order: p.order, isCaptain: p.isCaptain }))
  }
}

module.exports = TeamInterface