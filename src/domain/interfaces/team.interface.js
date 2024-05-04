class PlayersInterface {
  constructor(players) {
    this.id = players.id
    this.players = players.players.map(p => ({ order: p.order, ...p.player }))
  }
}

class TeamInterface {
  constructor(team) {
    this.id = team.id
    this.teamname = team.teamname
    this.captainId = team.captainId
    this.align =  new PlayersInterface(team.align)
    this.banking = new PlayersInterface(team.banking)
  }
}

module.exports = TeamInterface