const connection = require('./data/connection')
const PlayerModel = require('./data/models/player.model')
const players = require('./data/provider/players')
const app = require('./presentation/app')
const query = require('./querys')

const PORT = app.get('PORT')

// query.insertPlayers(players)
// query.showPlayers()
// query.showUsers()

async function main() {
  // console.log(await PlayerModel.findMany())
  // console.log(await connection.season.findMany())
}

// main()

// const z = require('zod')

// const schema = z.string()

// console.log(schema.parse(1))

app.listen(PORT, () => {
  console.log('Serve on port', PORT)
})