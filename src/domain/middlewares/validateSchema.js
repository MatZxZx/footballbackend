function validateSchema(schema) {
  return (req, res) => {
    try {
      schema.parse(req.body)
      next()
    } catch (err) {
      const errs = err.issues.map(e => e.message)
      return res.status(400).json(errs)
    }
  }
}

module.exports = validateSchema