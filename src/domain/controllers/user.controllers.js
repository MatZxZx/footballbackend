const UserModel = require('../../data/models/user.model')
const UserInterface = require('../interfaces/user.interface')
const TeamModel = require('../../data/models/team.model')

async function getAll(req, res) {
  const users = await UserModel.findMany()
  const usersResponse = users.map(user => new UserInterface(user))
  return res.json({ message: 'OK', data: usersResponse })
}

async function getById(req, res) {
  const { userFound } = req.body
  const userResponse = new UserInterface(userFound)
  return res.json(userResponse)
}

async function getWeeks(req, res) {
  const { userFound } = req.body
  const weeks = await UserModel.findManyWeeks({ teamId: userFound.teamId })
  if (!weeks.length)
    return res.status(400).json({ message: 'No hay semanas jugadas aun', data: {} })
  return res.status(200).json(weeks)
}

async function postTransfer(req, res) {
  const { userFound, transferAmount, transferCost, players } = req.body
  const data = players.map(p => ({ teamId: userFound.teamId, playerId: p.id, isBanking: p.isBanking, order: p.order, isCaptain: p.isCaptain }))
  try {
    if (userFound.willCardActive) {
      await UserModel.update({
        id: userFound.id,
        budget: userFound.budget - transferCost
      })
    } else {
      let badPoints = 0
      if (userFound.transfers - transferAmount < 0) {
        badPoints = (userFound.transfers - transferAmount) * 4
      }
      await UserModel.update({
        id: userFound.id,
        budget: userFound.budget - transferCost,
        transfers: userFound.transfers - transferAmount
      })
      await TeamModel.update({ id: userFound.teamId, badPoints: userFound.team.badPoints + badPoints })
    }
    await TeamModel.deleteTeamPlayer({ teamId: userFound.teamId })
    await TeamModel.createTeamPlayer({ data })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Error' })
  }
  return res.sendStatus(200)
}

async function putChange(req, res) { // cambiar los orders, isCaptain y los isBanking
  const { userFound, players } = req.body
  const newPlayers = players.map(p => ({
    teamId_playerId: {
      teamId: userFound.teamId,
      playerId: p.id
    },
    isBanking: p.isBanking,
    order: p.order,
    isCaptain: p.isCaptain
  }))
  try {
    await TeamModel.updateTeamsPlayers({ players: newPlayers })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Error' })
  }
  return res.sendStatus(200)
}

module.exports = {
  getAll,
  getById,
  getWeeks,
  postTransfer,
  putChange
}