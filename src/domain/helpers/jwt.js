const jwt = require('jsonwebtoken')

function createAccesToken(payload) {
  return new Promise((res, rej) => {
    const SECRET = process.env.TOKEN_SECRET
    jwt.sign(
      payload,
      SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) rej(err)
        res(token)
      }
    )
  })
}

module.exports = { createAccesToken }