const UserModel = require('../../data/models/user.model')
const UserInterface = require('../interfaces/user.interface')
const { createAccesToken } = require('../helpers/jwt')

async function login(req, res) {
  const { email, password } = req.body
  const { userFound, isMatch } = await UserModel.find(email, password)
  if (!userFound)
    return res.status(400).json({ message: 'El usuario no existe' })
  if (!isMatch)
    return res.json({ message: 'La contrasenia no es valida' })
  const token = await createAccesToken({ id: email })
  const user = new UserInterface(userFound)
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
  const token = await createAccesToken({ id: email })
  res.cookie('token', token)
  res.json(user)
}

async function logout(req, res) {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

module.exports = {
  login,
  register,
  logout
}