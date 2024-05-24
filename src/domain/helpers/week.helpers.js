const { getPlayerPoints } = require('./player.helpers')

function getSeasonDate() {
  return (new Date()).toLocaleDateString()
}

function incrementStatistics(statistcs) {
  return (p) => {
    statistcs.goals += p.goals
    statistcs.assists += p.assists
    statistcs.locks += p.locks
    statistcs.goalAgainst += p.goalAgainst
    statistcs.missedPenalty += p.missedPenalty
    statistcs.interception += p.interception
    statistcs.savedPenalty += p.savedPenalty
    statistcs.criminalCommitted += p.criminalCommitted
    statistcs.goalsConceded += p.goalsConceded
    statistcs.points += getPlayerPoints(p)
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

module.exports = {
  getSeasonDate,
  getTeamSeason
}