const { Router } = require('express')
const AuthController = require('../../domain/controllers/auth.controllers')
const ValidatorWeek = require('../../domain/middlewares/validator.week')

const router = Router()

router.use(ValidatorWeek.validateWeek)
router.use(ValidatorWeek.validateOpen)

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/verify', AuthController.verify)

module.exports = router