function validateSchema(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body)
      next()
    } catch (err) {
      console.log(err)
      return res.status(400).json({ err })
    }
  }
}

module.exports = validateSchema