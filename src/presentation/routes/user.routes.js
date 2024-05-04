const { Router } = require('express')
const UserController = require('../../domain/controllers/user.controllers')

const router = Router()

router.get('/:id', UserController.getById) // devuelve un usuario por id
router.get('/', UserController.getUsers) // devuelve todos los usuarios, sin incluir informacion sensible

module.exports = router