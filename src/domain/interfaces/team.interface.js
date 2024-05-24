const playerInterface = require("./player.interface")

class TeamInterface {
  constructor(team) {
    this.id = team.id
    this.teamname = team.teamname
    this.captainId = team.captainId
    this.players = team.players.map(p => new playerInterface(p))
  }
}

module.exports = TeamInterface