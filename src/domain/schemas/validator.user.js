function validatePlayers(players) {
  let valid = true
  players.forEach(p => {
    if (
      (p.id === undefined) ||
      (p.id <= 0) ||
      (p.isBanking === undefined) ||
      (p.order < 0 || p.order > 2) ||
      (p.isCaptain === undefined)
    ) valid = false
  })
  return valid
}

class ValidatorUser {

  static validatePostTransfer(req, res, next) {
    const {
      transferAmount,
      transferCost,
      players
    } = req.body
    if (transferAmount === undefined)
      return res.status(400).json({ message: 'No se envio la cantidad de transferencias' })
    if (transferCost === undefined)
      return res.status(400).json({ message: 'No se envio el costo de la transferencia' })
    if (players === undefined)
      return res.status(400).json({ message: 'No se enviaron los jugadores' })
    if (players.length !== 9)
      return res.status(400).json({ message: 'Se debe enviar 9 jugadores' })
    if (validatePlayers(players))
      return next()
    return res.status(400).json({ message: 'El esquema los jugadores es incorrecto' })
  }

  static validatePutChange(req, res, next) {
    const { players } = req.body
    if (players === undefined)
      return res.status(400).json({ message: 'No se enviaron los jugadores' })
    if (players.length !== 9)
      return res.status(400).json({ message: 'Se debe enviar 9 jugadores' })
    if (validatePlayers(players))
      return next()
    return res.status(400).json({ message: 'El esquema los jugadores es incorrecto' })
  }
}

module.exports = ValidatorUser