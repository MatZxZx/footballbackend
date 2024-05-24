function getPlayerPoints(p) {
  let points = 0
  if (p.present)
    points++
  switch (p.position) {
    case 'DEL':
      points += p.goals * 4
      break
    case 'DF':
      points += p.goals * 6
      break
    case 'MC':
      points += p.goals * 5
      break
    case 'PT':
      points += p.goals * 10
      break
  }
  points += p.assists * 3
  points += p.locks
  points -= p.goalAgainst * 2
  points -= p.missedPenalty * 2
  points += p.position === 'PT' ? 0 : parseInt(p.interception / 2)
  points += p.savedPenalty * 5
  points -= p.criminalCommitted
  points += p.emptyGoal ? 4 : 0
  points -= p.position === 'PT' || p.position === 'DF' ? parseInt(p.goalsConceded / 2) : 0
  return points
}

function getPlayerValoration(valorations) {
  if (valorations.length === 0)
    return 0
  const total = valorations.reduce((acum, value) => acum + value.valoration, 0)
  return total / valorations.length
}

module.exports = {
  getPlayerPoints,
  getPlayerValoration
}