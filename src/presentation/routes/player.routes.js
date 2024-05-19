const { Router } = require('express')
const PlayerController = require('../../domain/controllers/player.controllers')

const router = Router()

router.get('/', PlayerController.getAll)

router.get('/:id', PlayerController.getById)

router.get('/best-players-lastweek', PlayerController.getFourBest)

router.get('/more-buy-players-lastweek', PlayerController.getMoreAndLessBought)

router.post('/valoration/:id', PlayerController.postValoration)

router.put('/statistics/:id', PlayerController.putStatistics)

module.exports = router