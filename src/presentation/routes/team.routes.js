const { Router } = require('express')
const TeamController = require('../../domain/controllers/team.controllers')
const validateWeek = require('../../domain/middlewares/validateWeek')
const validateToken = require('../../domain/middlewares/validateToken')

const router = Router()

router.get('/:id', validateWeek, validateToken, TeamController.getById)

router.post('/add-player-align/:id', validateWeek, validateToken, TeamController.postPlayerToAlign) // Agrega un jugador en la alineacion

router.post('/add-player-banking/:id', validateWeek, validateToken, TeamController.postPlayerToBanking) // Agrega un jugador en la banca 

router.put('/change-align-align/:id', validateWeek, validateToken, TeamController.putPlayerAlignToAlign) // Cambia un jugador en la alineacion por otro que este en la misma alineacion

router.put('/change-banking-banking/:id', validateWeek, validateToken, TeamController.putPlayerBankingToBanking) // Cambia un jugador en la banca por otro que este en la misma banca

router.put('/change-align-banking/:id', validateWeek, validateToken, TeamController.putPlayerAlignToBanking) // Cambia un jugador en la alineacion por otro que esta en la banca del mismo equipo

router.put('/change-captain/:id', validateWeek, validateToken, TeamController.putCaptainById) // Cambia de capitan por un jugador que esta en la alineacion del mismo equipo

router.get('/all/:id', validateWeek, validateToken, TeamController.getAll)

module.exports = router