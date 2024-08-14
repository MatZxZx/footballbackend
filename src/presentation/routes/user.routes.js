const { Router } = require('express')
const UserController = require('../../domain/controllers/user.controllers')
const ValidatorWeek = require('../../domain/middlewares/validator.week')
const ValidatorToken = require('../../domain/middlewares/validator.token')
const ValidatorUser = require('../../domain/schemas/validator.user')
const { validateUser } = require('../../domain/middlewares/validate.entity')

const router = Router()

router.use(ValidatorToken.validateToken)
router.use(ValidatorWeek.validateWeek)
router.use(ValidatorWeek.validateOpen)

router.get('/', UserController.getAll) // devuelve todos los usuarios

router.get('/:id', validateUser, UserController.getById) // devuelve un usuario

router.get('/weeks/:id', validateUser, UserController.getWeeks) // devuelve todas las semanas de un usuario

router.post('/transfer/:id', validateUser, ValidatorUser.validatePostTransfer, UserController.postTransfer) // realiza compras (el estado del usuario)

router.put('/change/:id', validateUser, ValidatorUser.validatePutChange, UserController.putChange) // cambia el equipo (no el estado del usuario)

module.exports = router