function incrementStatistics(statistcs) {
  return (p) => {

    if (p.present)
      statistcs.points++

    switch (p.player.position) {
      case 'DEL':
        statistcs.goals += p.player.goals * 4
      case 'DF':
        statistcs.goals += p.player.goals * 6
      case 'MC':
        statistcs.goals += p.player.goals * 5
      case 'PT':
        statistcs.goals += p.player.goals * 10
    }

    statistcs.assists += p.player.assists
    statistcs.locks += p.player.locks
    statistcs.goalAgainst += p.player.goalAgainst
    statistcs.missedPenalty += p.player.missedPenalty

    statistcs.points += statistcs.goals
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
      emptyGoal: 0,
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
}

function getPlayerPoints(p) {
  let points = 0

  if (p.present)
      statistcs.points++

    switch (p.player.position) {
      case 'DEL':
        points += p.player.goals * 4
      case 'DF':
        points += p.player.goals * 6
      case 'MC':
        points += p.player.goals * 5
      case 'PT':
        points += p.player.goals * 10
    }

    points += p.player.assists * 3
    points += p.player.locks
    points -= p.player.goalAgainst * 2
    points -= p.player.missedPenalty * 2

    points += p.player.position === 'PT' ? 0 : parseInt(p.player.interception / 2)
    points += p.player.savedPenalty * 5
    points -= p.player.criminalCommitted
    points += p.player.emptyGoal ? 4 : 0
    points -= p.player.position === 'PT' || p.player.position === 'DF' ? parseInt(p.player.goalsConceded / 2) : 0

    return points
}

module.exports = {
  getTeamSeason,
  getPlayerPoints
}