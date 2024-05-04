const WeekController = require('../../domain/controllers/week.controllers')
const { Router } = require('express')

const router = Router()

router.post('/', WeekController.postWeek)

router.put('/open', WeekController.putOpenWeek('open'))

router.put('/close', WeekController.putOpenWeek('close'))

module.exports = router