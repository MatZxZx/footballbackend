const PlayerModel = require('../../data/models/player.model')
const playerInterface = require('../interfaces/player.interface')

async function getAll(req, res) { // Obtiene todos los jugadores
  const players = await PlayerModel.findMany()
  const playersResponse = players.map(p => new playerInterface(p))
  return res.json(playersResponse)
}

async function getById(req, res) {
  const id = parseInt(req.params.id)
  const player = await PlayerModel.findById(id)
  if (!player)
    return res.json({ message: 'El jugador no existe' })
  const playerResponse = new playerInterface(player)
  return res.json(playerResponse)
}

async function postOne(req, res) {
  const {
    name,
    lastname,
    position,
    price
  } = req.body
  const playerPrice = parseInt(price)
  const player = await PlayerModel.create(name, lastname, null, position, playerPrice)
  const playerResponse = new playerInterface(player)
  return res.json(playerResponse)
}

async function deleteById(req, res) {
  const id = parseInt(req.params.id)
  const player = await PlayerModel.delete(id)
  return res.json(player)
}

async function postValoration(req, res) {
  const playerId = parseInt(req.params.id)
  const { userId, valoration } = req.body
  if ((valoration < 1) || (valoration > 5))
    return req.status(400).json({ message: 'La valoracion debe ser entre 1 y 5' })
  const valorationFound = await PlayerModel.findValoration({ userId, playerId })
  let valorationResponse
  if (valorationFound) {
    valorationResponse = await PlayerModel.updateValoration({ userId, playerId, valoration })
  } else {
    valorationResponse = await PlayerModel.createValoration({ userId, playerId, valoration })
  }
  return res.json(valoration)
}

async function putStatistics(req, res) {
  const playerId = parseInt(req.params.id)
  const {
    goals,
    assists,
    locks,
    present,
    goalAgainst,
    missedPenalty,
    interception,
    savedPenalty,
    criminalCommitted,
    emptyGoal,
    goalsConceded
  } = req.body
  const player = await PlayerModel.findById(playerId)
  if (!player)
    return res.status(400).json({ message: `El jugador con id: ${playerId} no existe`})
  const updatedStatistics = await PlayerModel.updateStatistics({
    playerId,
    goals: goals ? player.goals + goals : undefined,
    assists: assists ? player.assists + assists : undefined,
    locks: locks ? player.locks + locks : undefined,
    present: present,
    goalAgainst: goalAgainst ? player.goalAgainst + goalAgainst : undefined,
    missedPenalty: missedPenalty ? player.missedPenalty + missedPenalty : undefined,
    interception: interception ? player.interception + interception : undefined,
    savedPenalty: savedPenalty ? player.savedPenalty + savedPenalty : undefined,
    criminalCommitted: criminalCommitted ? player.criminalCommitted + criminalCommitted : undefined,
    emptyGoal: emptyGoal ? emptyGoal : undefined,
    goalsConceded: goalsConceded ? player.goalsConceded + goalsConceded : undefined
  })
  return res.json(updatedStatistics)
}

module.exports = {
  getAll,
  getById,
  postOne,
  deleteById,
  postValoration,
  putStatistics
}