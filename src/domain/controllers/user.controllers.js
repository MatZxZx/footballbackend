const UserModel = require('../../data/models/user.model')


async function getById(req, res) {
  const id = parseInt(req.params.id)
  const users = await UserModel.findById(id)
  return res.json(users)
}

async function getUsers(req, res) {
  const users = await UserModel.findMany()
  return res.json(users)
}

module.exports = {
  getById,
  getUsers
}
