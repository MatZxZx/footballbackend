const WeekController = require('../../domain/controllers/week.controllers')
const ValidatorWeek = require('../../domain/middlewares/validator.week')
const { Router } = require('express')

const router = Router()

router.post('/', WeekController.postWeek)

router.put('/open', ValidatorWeek.validateWeek, ValidatorWeek.validateClose, WeekController.putToOpen)

router.put('/close', ValidatorWeek.validateWeek, ValidatorWeek.validateOpen, WeekController.putToClose)

module.exports = router