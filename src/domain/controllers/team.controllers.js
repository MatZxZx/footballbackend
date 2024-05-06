const TeamModel = require('../../data/models/team.model')
const PlayerModel = require('../../data/models/player.model')
const TeamInterface = require('../interfaces/team.interface')

function getId(req) {
  return parseInt(req.params.id)
}

async function getById(req, res) {
  const teamId = getId(req)
  const team = await TeamModel.findById(teamId)
  if (!team)
    return res.status(400).json({ message: `El equipo con id: ${teamId} no existe` })
  const teamResponse = new TeamInterface(team)
  return res.json(teamResponse)
}

async function postPlayerToAlign(req, res) {
  const teamId = getId(req)
  const playerId = req.body.playerId
  const team = await TeamModel.findById(teamId)
  if (!team)
    return res.status(400).json({ message: `El equipo con id: ${teamId} no existe` })
  const player = await PlayerModel.findById(playerId)
  if (!player)
    return res.status(400).json({ message: `El jugador con id: ${playerId} no existe` })
  const playerOnAlign = team.align.players.find(p => p.player.id === playerId)
  const playerOnBanking = team.banking.players.find(p => p.player.id === playerId)
  if (playerOnAlign || playerOnBanking)
    return res.status(400).json({ message: `El jugador con id: ${playerId} ya esta en el equipo` })
  const alignsPlayers = await TeamModel.findManyAlignPlayer({ alignId: team.alignId })
  if (alignsPlayers.length === 7)
    return res.status(400).json({ message: `La alineacion del equipo con id: ${teamId} esta completa` })
  const filterAligns = alignsPlayers.filter(ap => ap.player.position === player.position)
  if ((filterAligns.length === 3) || (player.position === 'PT' && filterAligns.length === 1))
    return res.status(400).json({ message: `Las posiciones de ${player.position} en el equipo con id: ${teamId} esta completa con ${filterAligns.length} jugadores` })
  if (filterAligns.length === 0) {
    await TeamModel.createAlignPlayer({ alignId: team.alignId, playerId, order: 1 })
  } else {
    let order = 1
    filterAligns.forEach(ap => {
      if (ap.order > order) {
        order = ap.order
      }
    })
    order++
    await TeamModel.createAlignPlayer({ alignId: team.alignId, playerId, order })
  }
  const newTeam = await TeamModel.findById(teamId)
  const teamRespone = new TeamInterface(newTeam)
  return res.json(teamRespone)
}

async function postPlayerToBanking(req, res) {
  const teamId = getId(req)
  const playerId = req.body.playerId
  const team = await TeamModel.findById(teamId)
  if (!team)
    return res.status(400).json({ message: `El equipo con id: ${teamId} no existe` })
  const player = await PlayerModel.findById(playerId)
  if (!player)
    return res.status(400).json({ message: `El jugador con id: ${playerId} no existe` })
  const playerOnAlign = team.align.players.find(p => p.player.id === playerId)
  const playerOnBanking = team.banking.players.find(p => p.player.id === playerId)
  if (playerOnAlign || playerOnBanking)
    return res.status(400).json({ message: `El jugador con id: ${playerId} ya esta en el equipo` })
  const bankingsPlayers = await TeamModel.findManyBankingPlayer({ bankingId: team.bankingId })
  if (bankingsPlayers.length === 2)
    return res.status(400).json({ message: `La banca del equipo con id: ${teamId} esta completa` })
  let order = bankingsPlayers.length + 1
  await TeamModel.createBankingPlayer({ bankingId: team.bankingId, playerId, order })
  const newTeam = await TeamModel.findById(teamId)
  const teamRespone = new TeamInterface(newTeam)
  return res.json(teamRespone)
}

async function putPlayerAlignToAlign(req, res) {
  const teamId = getId(req)
  const { playerAId, playerBId } = req.body
  const team = await TeamModel.findById(teamId)
  if (!team)
    return res.status(400).json({ message: `El equipo con id: ${teamId} no existe` })
  const playerA = await PlayerModel.findById(playerAId)
  if (!playerA)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no existe` })
  const playerB = await PlayerModel.findById(playerBId)
  if (!playerB)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no existe` })
  const playerAOnAlign = team.align.players.find(p => p.player.id === playerAId)
  const playerBOnAlign = team.align.players.find(p => p.player.id === playerBId)
  if (!playerAOnAlign)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no esta en la alineacion del equipo con id: ${teamId}` })
  if (!playerBOnAlign)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no esta en la alineacion del equipo con id: ${teamId}` })
  if (playerA.position !== playerB.position)
    return res.status(400).json({ message: `Los jugadores tienen posiciones distintas` })
  const playersAligns = await TeamModel.findManyAlignPlayer({ alignId: team.alignId })
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
  await TeamModel.updateOrderAlignPlayer({ alignId: team.alignId, playerId: playerA.id, order: orderB })
  await TeamModel.updateOrderAlignPlayer({ alignId: team.alignId, playerId: playerB.id, order: orderA })
  const newTeam = await TeamModel.findById(teamId)
  const teamRespone = new TeamInterface(newTeam)
  return res.json(teamRespone)
}

async function putPlayerBankingToBanking(req, res) {
  const teamId = getId(req)
  const { playerAId, playerBId } = req.body
  const team = await TeamModel.findById(teamId)
  if (!team)
    return res.status(400).json({ message: `El equipo con id: ${teamId} no existe` })
  const playerA = await PlayerModel.findById(playerAId)
  if (!playerA)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no existe` })
  const playerB = await PlayerModel.findById(playerBId)
  if (!playerB)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no existe` })
  const playerAOnBanking = team.banking.players.find(p => p.player.id === playerAId)
  const playerBOnBanking = team.banking.players.find(p => p.player.id === playerBId)
  if (!playerAOnBanking)
    return res.status(400).json({ message: `El jugador con id: ${playerAId} no esta en la banca del equipo con id: ${teamId}` })
  if (!playerBOnBanking)
    return res.status(400).json({ message: `El jugador con id: ${playerBId} no esta en la banca del equipo con id: ${teamId}` })
  const playersBanking = await TeamModel.findManyBankingPlayer({ bankingId: team.bankingId })
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
  await TeamModel.updateOrderBankingPlayer({ bankingId: team.bankingId, playerId: playerA.id, order: orderB })
  await TeamModel.updateOrderBankingPlayer({ bankingId: team.bankingId, playerId: playerB.id, order: orderA })
  const newTeam = await TeamModel.findById(teamId)
  const teamRespone = new TeamInterface(newTeam)
  return res.json(teamRespone)
}

async function putPlayerAlignToBanking(req, res) {
  const teamId = getId(req)
  const { playerOnAlignId, playerOnBankingId } = req.body
  const team = await TeamModel.findById(teamId)
  if (!team)
    return res.status(400).json({ message: `El equipo con id: ${teamId} no existe` })
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
    return res.status(400).json({ message: `El jugador con id ${playerOnAlignId} es el capitan del equipo y no puede ir a la banca`})
  await TeamModel.updatePlayerAlignPlayer({ alignId: team.alignId, playerOnAlignId, playerOnBankingId })
  await TeamModel.updatePlayerBankingPlayer({ bankingId: team.bankingId, playerOnBankingId, playerOnAlignId })
  const newTeam = await TeamModel.findById(teamId)
  const teamRespone = new TeamInterface(newTeam)
  return res.json(teamRespone)
}

async function putCaptainById(req, res) {
  const teamId = getId(req)
  const captainId = req.body.playerId
  const team = await TeamModel.findById(teamId)
  if (!team)
    return res.status(400).json({ message: `El equipo con id: ${teamId} no existe` })
  const player = await PlayerModel.findById(captainId)
  if (!player)
    return res.status(400).json({ message: `El jugador con id: ${captainId} no existe` })
  const playerOnAlign = team.align.players.find(p => p.player.id === captainId)
  if (!playerOnAlign)
    return res.status(400).json({ message: `El jugador con id: ${captainId} no esta en la alineacion` })
  const newTeam = await TeamModel.updateCaptain({ id: teamId, captainId })
  const teamResponse = new TeamInterface(newTeam)
  return res.json(teamResponse)
}

module.exports = {
  getById,
  postPlayerToAlign,
  postPlayerToBanking,
  putPlayerAlignToAlign,
  putPlayerBankingToBanking,
  putPlayerAlignToBanking,
  putCaptainById,
}