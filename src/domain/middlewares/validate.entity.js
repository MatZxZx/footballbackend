const UserModel = require('../../data/models/user.model')
const TeamModel = require('../../data/models/user.model')
const UserAdminModel = require('../../data/models/user.model')
const PlayerModel = require('../../data/models/user.model')


async function validateUser(req, res, next) {
  const id = parseInt(req.params.id)  
  const userFound = await UserModel.findById(id)
  if (!userFound)
    return res.status(400).json({ message: 'El usuario no existe'})
  req.body.userFound = userFound
  next()
}

module.exports = {
  validateUser
}