const jwt = require('jsonwebtoken')


function validateAdminToken(req, res, next) {
  const { token } = req.cookies
  const SECRET = process.env.TOKEN_SECRET_ADMIN
  if (!token) return res.status(401).json({ message: 'Solo los admins pasan pa' })
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'El token no es valido sinwenwencha' })
    req.user = user
    next()
  })
}

module.exports = validateAdminToken