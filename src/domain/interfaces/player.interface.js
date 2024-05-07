function getValorationTotal(valorations) {
  if (valorations.length === 0)
    return 0
  const total = valorations.reduce((acum, value) => acum + value.valoration, 0)
  return total / valorations.length
}

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
    this.valorations = getValorationTotal(player.valorations)
    // this.points = p.points ? p.points : 0
  }
}

module.exports = playerInterface