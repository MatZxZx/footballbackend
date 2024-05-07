const PlayerModel = require('../../data/models/player.model')
const { getPlayerPoints } = require('../helpers/fun')
const playerInterface = require('../interfaces/player.interface')

async function getAll(req, res) {
  const players = await PlayerModel.findMany()
  const playersAddStatistcs = players.map(p => {
    const points = getPlayerPoints(p)
    return {
      ...p,
      points
    }
  })

  const playersResponse = playersAddStatistcs.map(p => new playerInterface(p))
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
    goals: goals,
    assists: assists,
    locks: locks,
    present: present,
    goalAgainst: goalAgainst,
    missedPenalty: missedPenalty,
    interception: interception,
    savedPenalty: savedPenalty,
    criminalCommitted: criminalCommitted,
    emptyGoal: emptyGoal,
    goalsConceded: goalsConceded
  })
  return res.json(updatedStatistics)
}

// sube el precio segun los puntos y las transferencias realizadas la semana pasada
// transferencias ilimitadas hasta que termine su primera semana
// las transferencias se realizan cuando se compra a un jugador


module.exports = {
  getAll,
  getById,
  postOne,
  deleteById,
  postValoration,
  putStatistics
}