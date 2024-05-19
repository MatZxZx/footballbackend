function incrementStatistics(statistcs) {
  return (p) => {
    statistcs.goals += p.player.goals
    statistcs.assists += p.player.assists
    statistcs.locks += p.player.locks
    statistcs.goalAgainst += p.player.goalAgainst
    statistcs.missedPenalty += p.player.missedPenalty
    statistcs.interception += p.player.interception
    statistcs.savedPenalty += p.player.savedPenalty
    statistcs.criminalCommitted += p.player.criminalCommitted
    statistcs.goalsConceded += p.player.goalsConceded
    statistcs.points += getPlayerPoints(p.player)
  }
}

function getTeamSeason({ seasonId, teams }) {
  return teams.map(team => {
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
    team.players.forEach(incrementStatistics(statistcs))
    statistcs.points -= team.badPoints
    return {
      seasonId,
      teamId: team.id,
      ...statistcs
    }
  })
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

function formatTeamPlayer(players, teamId) {
  return players.map(p => ({
    teamId_playerId: {
      teamId,
      playerId: p.id
    },
    order: p.order,
    isCaptain: p.isCaptain,
    isbanking: p.isbanking
  }))
}

module.exports = {
  getTeamSeason,
  getPlayerPoints,
  formatTeamPlayer
}