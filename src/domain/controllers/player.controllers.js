const PlayerModel = require('../../data/models/player.model')
const playerInterface = require('../interfaces/player.interface')
const WeekModel = require('../../data/models/week.model')

function playerSeasonToPlayer(playerSeason) {
  return {
    id: playerSeason.playerId,
    name: playerSeason.player.name,
    lastname: playerSeason.player.lastname,
    photo: playerSeason.player.photo,
    price: playerSeason.player.price,
    position: playerSeason.player.position,
    goals: playerSeason.goals,
    assists: playerSeason.assists,
    criminalCommitted: playerSeason.criminalCommitted,
    emptyGoal: playerSeason.emptyGoal,
    goalAgainst: playerSeason.goalAgainst,
    interception: playerSeason.interception,
    goalsConceded: playerSeason.goalsConceded,
    locks: playerSeason.locks,
    timesBought: playerSeason.timesBought,
    missedPenalty: playerSeason.missedPenalty,
    savedPenalty: playerSeason.savedPenalty,
    present: playerSeason.present,
    valorations: playerSeason.player.valorations
  }
}

class PlayerController {

  static async getAll(req, res) {
    const players = await PlayerModel.findMany()
    const playersResponse = players.map(p => new playerInterface(p))
    if (!playersResponse.length)
      return res.status(400).json({message: 'No hay jugadores', data: playersResponse})
    return res.json({message: 'OK', data: playersResponse})
  }

  static async getLastweekAll(req, res) {
    const seasons = await WeekModel.findManySeasons()
    if (!seasons.length)
      return res.status(400).json({ message: 'No hay semanas jugadas aun', data: {} })
    const lastWeek = seasons[seasons.length - 1]
    const players = lastWeek.players.map(p => playerSeasonToPlayer(p))
    const playersResponse = players.map(p => new playerInterface(p))
    console.log(playersResponse)
    return res.json({ message: 'OK', data: playersResponse })
  }

  static async getById(req, res) {
    const id = parseInt(req.params.id)
    const player = await PlayerModel.findById(id)
    if (!player)
      return res.json({ message: 'El jugador no existe' })
    const playerResponse = new playerInterface(player)
    return res.json(playerResponse)
  }

  static async getLastweekById(req, res) {
    const id = parseInt(req.params.id)
    const seasons = await WeekModel.findManySeasons()
    if (!seasons.length)
      return res.json({ message: 'No hay semanas jugadas aun' })
    const lastWeek = seasons[seasons.length - 1]
    const playerWeek = lastWeek.players.find(p => p.playerId === id)
    const playerResponse = new playerInterface(playerSeasonToPlayer(playerWeek))
    return res.json(playerResponse)
  }

  static async post(req, res) {
    const {
      name,
      lastname,
      position,
      price
    } = req.body
    const player = await PlayerModel.create(name, lastname, null, position, price)
    const playerResponse = new playerInterface(player)
    return res.json(playerResponse)
  }

  static async deleteById(req, res) {
    const id = parseInt(req.params.id)
    const player = await PlayerModel.delete(id)
    return res.json(player)
  }

  static async postValoration(req, res) {
    const playerId = parseInt(req.params.id)
    const { userId, valoration } = req.body
    if ((valoration < 1) || (valoration > 5))
      return req.status(400).json({ message: 'La valoracion debe ser entre 1 y 5' })
    const valorationFound = await PlayerModel.findValoration({ userId, playerId })

    valorationFound
      ? await PlayerModel.updateValoration({ userId, playerId, valoration })
      : await PlayerModel.createValoration({ userId, playerId, valoration })

    return res.sendStatus(200)
  }

  static async putStatistics(req, res) {
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
      return res.status(400).json({ message: `El jugador con id: ${playerId} no existe` })
    await PlayerModel.updateStatistics({
      id: playerId,
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
    })
    return res.sendStatus(200)
  }
}


// sube el precio segun los puntos y las transferencias realizadas la semana pasada
// transferencias ilimitadas hasta que termine su primera semana

module.exports = PlayerController