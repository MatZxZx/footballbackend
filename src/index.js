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
  // const userAdimn = await connection.userAdmin.create({
    // data: {
      // email: 'chapy@gmail.com',
      // password: 'lautaro123'
    // }
  // })
  console.log(userAdimn)
}

// main()

app.listen(PORT, () => {
  console.log('Serve on port', PORT)
})