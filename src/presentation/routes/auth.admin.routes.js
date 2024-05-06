const { Router} = require('express')
const { login } = require('../../domain/controllers/auth.admin.controllers')

const router = Router()

router.post('/login', login)

module.exports = router