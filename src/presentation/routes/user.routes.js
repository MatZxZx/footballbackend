const { Router } = require('express')
const UserController = require('../../domain/controllers/user.controllers')
const validateWeek = require('../../domain/middlewares/validateWeek')
const validateToken = require('../../domain/middlewares/validateToken')
const { validateUser } = require('../../domain/middlewares/validate.entity')

const router = Router()

router.use(validateToken)
router.use(validateWeek)

router.get('/', UserController.getAll) // devuelve todos los usuarios

router.get('/:id', validateUser, UserController.getById) // devuelve un usuario

router.get('/weeks/:id', validateUser, UserController.getWeeks) // devuelve todas las semanas de un usuario

router.post('/transfer/:id', validateUser, UserController.postTransfer) // realiza compras (afecta el presupuesto)

router.put('/change/:id', validateUser, UserController.putChange) // cambia el equipo (no afecta el presupuesto)

module.exports = router