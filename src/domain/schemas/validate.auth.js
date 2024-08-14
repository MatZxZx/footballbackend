
class isValid {
  static username(str) {
    return typeof str === 'string' && str.length >= 4
  }

  static teamname(str) {
    return typeof str === 'string' && str.length >= 4
  }

  static email(str) {
    return typeof str === 'string'
      && str.length >= 6
      && str.includes('@')
  }

  static password(str) {
    return typeof str === 'string' && str.length >= 6
  }
}

function validateRegister(req, res, next) {
  const {
    username,
    teamname,
    email,
    password
  } = req.body
  if (!isValid.username(username)) {
    return res.status(400).json({ message: 'username is not vaild' })
  } else if (!isValid.teamname(teamname)) {
    return res.status(400).json({ message: 'teamname is not vaild' })
  } else if (!isValid.email(email)) {
    return res.status(400).json({ message: 'email is not vaild' })
  } else if (!isValid.password(password)) {
    return res.status(400).json({ message: 'password is not vaild' })
  }
  next()
}

module.exports = {
  validateRegister
}