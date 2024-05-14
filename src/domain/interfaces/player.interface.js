function getValoration(valorations) {
  if (valorations.length === 0)
    return 0
  const total = valorations.reduce((acum, value) => acum + value.valoration, 0)
  return total / valorations.length
}

function getPoints(player) {
  let points = 0
  if (player.present)
    points++
  switch (player.position) {
    case 'DEL':
      points += player.goals * 4
      break
    case 'DF':
      points += player.goals * 6
      break
    case 'MC':
      points += player.goals * 5
      break
    case 'PT':
      points += player.goals * 10
      break
  }
  points += player.assists * 3
  points += player.locks
  points -= player.goalAgainst * 2
  points -= player.missedPenalty * 2
  points += player.position === 'PT' ? 0 : parseInt(player.interception / 2)
  points += player.savedPenalty * 5
  points -= player.criminalCommitted
  points += player.emptyGoal ? 4 : 0
  points -= player.position === 'PT' || player.position === 'DF' ? parseInt(player.goalsConceded / 2) : 0
  return points
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
    this.timesBought = player.timesBought
    this.valorations = getValoration(player.valorations)
    this.points = getPoints(player)
  }
}

module.exports = playerInterface