class TeamInterface {
  constructor(team) {
    this.id = team.id
    this.teamname = team.teamname
    this.captainId = team.captainId
    this.players = team.players.map(p => ({ ...p.player, isBanking: p.isBanking, order: p.order, isCaptain: p.isCaptain }))
  }
}

module.exports = TeamInterface