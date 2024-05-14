const { Router } = require('express')
const AuthController = require('../../domain/controllers/auth.controllers')
const validateSchema = require('../../domain/middlewares/validateSchema')
const { registerSchema, loginSchema } = require('../../domain/schemas/auth.schema')

const router = Router()

router.post('/register', validateSchema(registerSchema), AuthController.register)
router.post('/login', validateSchema(loginSchema), AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/verify', AuthController.verify)

module.exports = router