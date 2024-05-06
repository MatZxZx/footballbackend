const UserAdminModel = require('../../data/models/user.admin.model')

async function login(req, res) {
  const { email, password } = req.body
  const userFound = await UserAdminModel.findUserByEmail(email)
  if (userFound && userFound.password === password)
    return res.status(200).json({ state: true })
  return res.status(400).json({ state: false })
}

module.exports = {
  login
}