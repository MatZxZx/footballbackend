const app = require('./presentation/app')

const PORT = app.get('PORT')

app.listen(PORT, () => {
  console.log('Serve on port', PORT)
})