const { getPlayerPoints, getPlayerValoration } = require('../helpers/player.helpers')

class playerInterface {
  constructor(player) {
    this.id = player.id
    this.name = player.name
    this.lastname = player.lastname
    this.photo = player.photo
    this.price = player.price
    this.position = player.position
    this.goals = player.goals
    this.assists = player.assists
    this.locks = player.locks
    this.present = player.present
    this.goalAgainst = player.goalAgainst
    this.missedPenalty = player.missedPenalty
    this.interception = player.interception
    this.savedPenalty = player.savedPenalty
    this.criminalCommitted = player.criminalCommitted
    this.emptyGoal = player.emptyGoal
    this.goalsConceded = player.goalsConceded
    this.timesBought = player.timesBought
    this.valorations = getPlayerValoration(player.valorations)
    this.points = getPlayerPoints(player)
  }
}

module.exports = playerInterface