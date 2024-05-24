const { Router } = require('express')
const PlayerController = require('../../domain/controllers/player.controllers')
const ValidatorWeek = require('../../domain/middlewares/validator.week')
const ValidatorToken = require('../../domain/middlewares/validator.token')

const router = Router()

router.use(ValidatorToken.validateToken)
router.use(ValidatorWeek.validateWeek)
router.use(ValidatorWeek.validateOpen)

router.get('/', PlayerController.getAll)

router.get('/lastweek', PlayerController.getLastweekAll)

router.get('/:id', PlayerController.getById)

router.get('/lastweek/:id', PlayerController.getLastweekById)

router.post('/', PlayerController.post)

router.post('/valoration/:id', PlayerController.postValoration)

router.put('/statistics/:id', PlayerController.putStatistics)

module.exports = router