const { Router } = require('express')
const PlayerController = require('../../domain/controllers/player.controllers')
const validateSchema = require('../../domain/middlewares/validateSchema')
const { playerSchema } = require('../../domain/schemas/player.schema')

const router = Router()

router.get('/', PlayerController.getAll)

router.get('/:id', PlayerController.getById)

router.get('/get/best-players-lastweek', PlayerController.getFourBest)

router.get('/get/more-buy-players-lastweek', PlayerController.getMoreAndLessBought)

router.post('/', validateSchema(playerSchema), PlayerController.postOne)

router.delete('/:id', PlayerController.deleteById)

router.post('/valoration/:id', PlayerController.postValoration)

router.post('/statistics/:id', PlayerController.putStatistics)

module.exports = router

// ezequielcorbalan@30f.com.ar