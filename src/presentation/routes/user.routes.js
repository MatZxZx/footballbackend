const { Router } = require('express')
const UserController = require('../../domain/controllers/user.controllers')
const validateWeek = require('../../domain/middlewares/validateWeek')
const validateToken = require('../../domain/middlewares/validateToken')
const { validateUser } = require('../../domain/middlewares/validate.entity')

const router = Router()

router.get('/:id', UserController.getById) // devuelve un usuario por id

router.get('/', UserController.getAll) // devuelve todos los usuarios, sin incluir informacion sensible

router.get('/weeks/:id', validateUser, UserController.getWeeks) // devuelve todos los usuarios, sin incluir informacion sensible

router.post('/add-player-align/:id', validateWeek, validateToken, validateUser, UserController.postPlayerToAlign) // Agrega un jugador en la alineacion

router.post('/add-player-banking/:id', validateWeek, validateToken, validateUser, UserController.postPlayerToBanking) // Agrega un jugador en la banca 

router.put('/change-align-align/:id', validateWeek, validateToken, validateUser, UserController.putPlayerAlignToAlign) // Cambia un jugador en la alineacion por otro que este en la misma alineacion

router.put('/change-banking-banking/:id', validateWeek, validateToken, validateUser, UserController.putPlayerBankingToBanking) // Cambia un jugador en la banca por otro que este en la misma banca

router.put('/change-align-banking/:id', validateWeek, validateToken, validateUser, UserController.putPlayerAlignToBanking) // Cambia un jugador en la alineacion por otro que esta en la banca del mismo equipo

router.put('/change-captain/:id', validateWeek, validateToken, validateUser, UserController.putCaptainById) // Cambia de capitan por un jugador que esta en la alineacion del mismo equipo

module.exports = router