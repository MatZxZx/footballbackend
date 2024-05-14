const UserModel = require('../../data/models/user.model')
const UserInterface = require('../interfaces/user.interface')
const { createAccesToken, verifyAccesToken } = require('../helpers/jwt')

async function login(req, res) {
  const { email, password } = req.body
  const { userFound, isMatch } = await UserModel.find(email, password)
  if (!userFound)
    return res.status(400).json({ message: 'El usuario no existe' })
  if (!isMatch)
    return res.json({ message: 'La contrasenia no es valida' })
  const user = new UserInterface(userFound)
  const token = await createAccesToken({
    id: user.id
  })
  res.cookie('token', token)
  return res.json(user)
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
    return res.json({ message: 'El usuario ya existe' })
  const userSaved = await UserModel.create(email, username, password, teamname)
  const user = new UserInterface(userSaved)
  const token = await createAccesToken({
    id: user.id
  })
  res.cookie('token', token)
  res.json(user)
}

async function logout(req, res) {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

async function verify(req, res) {
  const token = req.cookies.token
  if (!token)
    return res.status(401).json({ message: 'No token pa' })
  const { id: userId } = await verifyAccesToken(req.cookies.token)
  const user = await UserModel.findById(userId)
  if (!user) 
    return res.status(400).json({ message: 'El usuario no existe' })
  const userResponse = new UserInterface(user)
  return res.json(userResponse)
}

module.exports = {
  login,
  register,
  logout,
  verify
}
