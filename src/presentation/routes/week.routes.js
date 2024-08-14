const WeekController = require('../../domain/controllers/week.controllers')
const ValidatorWeek = require('../../domain/middlewares/validator.week')
const { Router } = require('express')

const router = Router()

router.get('/', WeekController.get)

router.post('/', WeekController.post)

router.put('/open', ValidatorWeek.validateWeek, ValidatorWeek.validateClose, WeekController.putToOpen)

router.put('/close', ValidatorWeek.validateWeek, ValidatorWeek.validateOpen, WeekController.putToClose)

module.exports = router