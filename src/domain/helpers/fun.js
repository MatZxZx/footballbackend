function incrementStatistics(statistcs) {
  return (p) => {
    if (p.present)
      statistcs.points++

    switch (p.player.position) {
      case 'DEL':
        statistcs.points += p.player.goals * 4
        break
      case 'DF':
        statistcs.points += p.player.goals * 6
        break
      case 'MC':
        statistcs.points += p.player.goals * 5
        break
      case 'PT':
        statistcs.points += p.player.goals * 10
        break
    }

    statistcs.goals += p.player.goals
    statistcs.assists += p.player.assists
    statistcs.locks += p.player.locks
    statistcs.goalAgainst += p.player.goalAgainst
    statistcs.missedPenalty += p.player.missedPenalty
    statistcs.interception += p.player.interception
    statistcs.savedPenalty += p.player.savedPenalty
    statistcs.criminalCommitted += p.player.criminalCommitted
    statistcs.goalsConceded += p.player.goalsConceded

    statistcs.points += p.player.assists * 3
    statistcs.points += p.player.locks
    statistcs.points -= p.player.goalAgainst * 2
    statistcs.points -= p.player.missedPenalty * 2

    statistcs.points += p.player.position === 'PT' ? 0 : parseInt(p.player.interception / 2)
    statistcs.points += p.player.savedPenalty * 5
    statistcs.points -= p.player.criminalCommitted
    statistcs.points += p.player.emptyGoal ? 4 : 0
    statistcs.points -= p.player.position === 'PT' || p.player.position === 'DF' ? parseInt(p.player.goalsConceded / 2) : 0
  }
}

function getTeamSeason({ seasonId, teams }) {
  const teamsFormat = []
  teams.forEach(team => {
    const statistcs = {
      goals: 0,
      assists: 0,
      locks: 0,
      goalAgainst: 0,
      missedPenalty: 0,
      points: 0,
      interception: 0,
      savedPenalty: 0,
      criminalCommitted: 0,
      goalsConceded: 0
    }

    team.align.players.forEach(incrementStatistics(statistcs))
    team.banking.players.forEach(incrementStatistics(statistcs))
    statistcs.points -= team.badPoints

    teamsFormat.push({
      seasonId,
      teamId: team.id,
      ...statistcs
    })
  })
  return teamsFormat
}

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

module.exports = {
  getTeamSeason,
  getPlayerPoints
}