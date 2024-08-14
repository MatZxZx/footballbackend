const prisma = require('./data/prisma')
const app = require('./presentation/app')
const players = require('./data/provider/players')
const PORT = app.get('PORT')

app.listen(PORT, () => {
  console.log('Serve on port', PORT)
  
  async function main() {
    try {
      await prisma.user.deleteMany()
      console.log('add players')
    } catch (e) {
      console.log(e)
    }
  }

  // main()
})