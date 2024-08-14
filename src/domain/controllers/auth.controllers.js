const UserModel = require('../../data/models/user.model')
const UserInterface = require('../interfaces/user.interface')
const { createAccesToken, verifyAccesToken } = require('../libs/jwt')

async function login(req, res) {
  const { email, password } = req.body
  const { userFound, isMatch } = await UserModel.find(email, password)
  if ((!userFound) || (!isMatch))
    return res.status(400).json({ message: 'Email or password invalid', data: {} })
  const user = new UserInterface(userFound)
  const token = await createAccesToken({
    id: user.id
  })
  res.cookie('token', token)
  return res.json({ message: 'OK', data: user })
}

async function register(req, res) {
  const {
    email,
    username,
    teamname,
    password
  } = req.body
  const userFound = await UserModel.findByEmail(email)
  if (userFound)
    return res.json({ message: 'El usuario ya existe', data: {} })
  const userSaved = await UserModel.create(email, username, password, teamname)
  const user = new UserInterface(userSaved)
  const token = await createAccesToken({
    id: user.id
  })
  res.cookie('token', token)
  res.json({ message: 'OK', data: user })
}

async function logout(req, res) {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

async function verify(req, res) {
  const { token } = req.cookies
  if (!token)
    return res.status(401).json({ message: 'No token pa', data: {} })
  const { id: userId } = await verifyAccesToken(req.cookies.token)
  const user = await UserModel.findById(userId)
  if (!user)
    return res.status(400).json({ message: 'El usuario no existe', data: {} })
  const userResponse = new UserInterface(user)
  return res.json({ message: 'OK', data: userResponse })
}

module.exports = {
  login,
  register,
  logout,
  verify
}
