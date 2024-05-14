const UserModel = require('../../data/models/user.model')
const UserInterface = require('../interfaces/user.interface')
const TeamModel = require('../../data/models/team.model')
const PlayerModel = require('../../data/models/player.model')
const {
  MAX_PLAYERS_ON_ALING,
  MAX_PLAYERS_ON_SECTION,
  MAX_PLAYERS_ON_BANKING
} = require('../../config/const')
const connection = require('../../data/connection')

async function getById(req, res) {
  const id = parseInt(req.params.id)
  const user = await UserModel.findById(id)
  if (!user)
    return res.status(400).json({ message: 'Usuario no existe' })
  const userResponse = new UserInterface(user)
  return res.json(userResponse)
}

async function getAll(req, res) {
  const users = await UserModel.findMany()
  const usersResponse = users.map(user => new UserInterface(user))
  return res.json(usersResponse)
}

async function getWeeks(req, res) {
  const userFound = req.body.userFound
  const weeks = await UserModel.findManyWeeks({ teamId: userFound.teamId })
  return res.status(200).json(weeks)
}

async function postPlayerToAlign(req, res) {
  const { userFound, playerId, order } = req.body
  const { align } = userFound.team
  const player = await PlayerModel.findById(playerId)
  if (!player)
    return res.status(400).json({ message: 'El jugador no existe' })
  const alignsPlayers = await TeamModel.findManyAlignPlayer({ alignId: align.id })
  const playerOnPositionAndOrder = alignsPlayers.find(e => e.player.position === player.position && e.order === order)
  let finalPrice
  let state
  if (playerOnPositionAndOrder) {
    if (playerOnPositionAndOrder.player.id === player.id) {
      state = { code: 0 }
      finalPrice = player.price * -1
    } else {
      state = { code: 1, playerToUpdate: playerOnPositionAndOrder.playerId, order: playerOnPositionAndOrder.order}
      finalPrice = player.price - playerOnPositionAndOrder.player.price
    }
  } else {
    state = { code: 2, order }
    finalPrice = player.price
  }
  try {
    await UserModel.transactionPlayerToAlign({ userId: userFound.id, alignId: align.id, playerId: player.id, price: finalPrice, state })
  } catch(e) {
    console.log(e)
  }
  return res.sendStatus(200)
}

async function postPlayerToBanking(req, res) {
  const { userFound, playerId, order } = req.body
  const { banking } = userFound.team
  const player = await PlayerModel.findById(playerId)
  if (!player)
    return res.status(400).json({ message: `El jugador con id: ${playerId} no existe` })
  let finalPrice
  let state
  const bankingsPlayers = await TeamModel.findManyBankingPlayer({ bankingId: banking.id })
  const playerOnPositionAndOrder = bankingsPlayers.find(e => e.player.position === player.position && e.order === order)
  if (playerOnPositionAndOrder) {
    if (playerOnPositionAndOrder.player.id === player.id) {
      state = { code: 0 }
      finalPrice = player.price * -1
    } else {
      state = { code: 1, playerToUpdate: playerOnPositionAndOrder.playerId, order: playerOnPositionAndOrder.order}
      finalPrice = player.price - playerOnPositionAndOrder.player.price
    }
  } else {
    state = { code: 2, order }
    finalPrice = player.price
  }
  try {
    await UserModel.transactionPlayerToBanking({userId: userFound.id, bankingId: banking.id, playerId: player.id, price: finalPrice, state })
  } catch (e) {
    console.log(e)
  }
  return res.sendStatus(200)
}

async function putPlayerAlignToAlign(req, res) {
  const team = req.body.userFound.team
  const { playerAId, playerBId } = req.body
  const playerA = await PlayerModel.findById(playerAId)
  if (!playerA)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no existe` })
  const playerB = await PlayerModel.findById(playerBId)
  if (!playerB)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no existe` })
  const playerAOnAlign = team.align.players.find(p => p.player.id === playerAId)
  const playerBOnAlign = team.align.players.find(p => p.player.id === playerBId)
  if (!playerAOnAlign)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no esta en la alineacion del usuario` })
  if (!playerBOnAlign)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no esta en la alineacion del usuario` })
  if (playerA.position !== playerB.position)
    return res.status(400).json({ message: `Los jugadores tienen posiciones distintas` })
  const playersAligns = await TeamModel.findManyAlignPlayer({ alignId: team.align.id })
  const playersAlignsFilter = playersAligns.filter(pa => pa.player.position === playerA.position)
  let orderA
  let orderB
  playersAlignsFilter.forEach(pa => {
    if (pa.player.id === playerA.id) {
      orderA = pa.order
    }
    if (pa.player.id === playerB.id) {
      orderB = pa.order
    }
  })
  if ((!orderA) || (!orderB))
    return res.status(500).json({ message: 'Error inesperado' })
  await TeamModel.updateOrderAlignPlayer({ alignId: team.align.id, playerId: playerA.id, order: orderB })
  await TeamModel.updateOrderAlignPlayer({ alignId: team.align.id, playerId: playerB.id, order: orderA })
  return res.sendStatus(200)
}

async function putPlayerBankingToBanking(req, res) {
  const team = req.body.userFound.team
  const { playerAId, playerBId } = req.body
  const playerA = await PlayerModel.findById(playerAId)
  if (!playerA)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no existe` })
  const playerB = await PlayerModel.findById(playerBId)
  if (!playerB)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no existe` })
  const playerAOnBanking = team.banking.players.find(p => p.player.id === playerAId)
  const playerBOnBanking = team.banking.players.find(p => p.player.id === playerBId)
  if (!playerAOnBanking)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no esta en la banca del usuario` })
  if (!playerBOnBanking)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no esta en la banca del usuario` })
  const playersBanking = await TeamModel.findManyBankingPlayer({ bankingId: team.banking.id })
  let orderA
  let orderB
  playersBanking.forEach(pa => {
    if (pa.player.id === playerA.id) {
      orderA = pa.order
    }
    if (pa.player.id === playerB.id) {
      orderB = pa.order
    }
  })
  if ((!orderA) || (!orderB))
    return res.status(500).json({ message: 'Error inesperado' })
  await TeamModel.updateOrderBankingPlayer({ bankingId: team.banking.id, playerId: playerA.id, order: orderB })
  await TeamModel.updateOrderBankingPlayer({ bankingId: team.banking.id, playerId: playerB.id, order: orderA })
  return res.sendStatus(200)
}

async function putPlayerAlignToBanking(req, res) {
  const team = req.body.userFound.team
  const { playerOnAlignId, playerOnBankingId } = req.body
  const playerOnAlign = await PlayerModel.findById(playerOnAlignId)
  if (!playerOnAlign)
    return res.status(400).json({ message: `El jugador en la alineacion con id: ${playerOnAlign} no existe` })
  const playerOnBanking = await PlayerModel.findById(playerOnBankingId)
  if (!playerOnBanking)
    return res.status(400).json({ message: `El jugador en la banca con id: ${playerOnBankingId} no existe` })
  const playerOnAlignFound = team.align.players.find(p => p.player.id === playerOnAlignId)
  const playerBOnBanking = team.banking.players.find(p => p.player.id === playerOnBankingId)
  if (!playerOnAlignFound)
    return res.status(400).json({ message: `El jugador con id: ${playerOnAlignId} no esta en la alineacion del equipo con id: ${teamId}` })
  if (!playerBOnBanking)
    return res.status(400).json({ message: `El jugador con id: ${playerOnBankingId} no esta en la banca del equipo con id: ${teamId}` })
  if (playerOnAlignId === team.captainId)
    return res.status(400).json({ message: `El jugador con id ${playerOnAlignId} es el capitan del equipo y no puede ir a la banca` })
  await TeamModel.updatePlayerAlignPlayer({ alignId: team.align.id, playerOnAlignId, playerOnBankingId })
  await TeamModel.updatePlayerBankingPlayer({ bankingId: team.banking.id, playerOnBankingId, playerOnAlignId })
  return res.sendStatus(200)
}

async function putCaptainById(req, res) {
  const team = req.body.userFound.team
  const captainId = req.body.playerId
  const player = await PlayerModel.findById(captainId)
  if (!player)
    return res.status(400).json({ message: `El jugador con id: ${captainId} no existe` })
  const playerOnAlign = team.align.players.find(p => p.player.id === captainId)
  if (!playerOnAlign)
    return res.status(400).json({ message: `El jugador con id: ${captainId} no esta en la alineacion` })
  try {
    await TeamModel.updateCaptain({ id: team.id, captainId })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Error inesperado' })
  }
  return res.sendStatus(200)
}

module.exports = {
  getAll,
  getById,
  getWeeks,
  postPlayerToAlign,
  postPlayerToBanking,
  putPlayerAlignToAlign,
  putPlayerBankingToBanking,
  putPlayerAlignToBanking,
  putCaptainById,
}