const app = require('./presentation/app')
const prisma = require('./data/connection')
const players = require('./data/provider/players')

const PORT = app.get('PORT')

async function main() {
  try {
    // const res = await prisma.player.createMany({
    //   data: players
    // })
    // console.log(res)
    // const res = await prisma.userAdmin.create({
      // data: {
        // email: 'chapy@gmail.com',
        // password: 'goku123'
      // }
    // })
    // const res = await prisma.season.delete({
      // where: {
        // id: 2
      // }
    // })
    // console.log(await prisma.playerSeason.findMany())
    // const res0 = await prisma.user.deleteMany()
    // const res5 = await prisma.userPlayer.deleteMany()
    // const res = await prisma.teamSeason.deleteMany()
    // const res1 = await prisma.team.deleteMany()
    // const res2 = await prisma.playerSeason.deleteMany()
    // const res3 = await prisma.player.deleteMany()
    // const res4 = await prisma.season.deleteMany()
    // await prisma.$executeRaw`DELETE `
    // const res = await prisma.user.update({
    //   where: {
    //     id: 2
    //   },
    //   data: {
    //     budget: 100
    //   }
    // })
    // const res = await prisma.$executeRaw`UPDATE AlignPlayer SET playerId = 200 WHERE alignId = 100 AND playerId = 100`
    console.log(res)
  } catch (e) {
    console.log(e)
  }
  
}

// main()

app.listen(PORT, () => {
  console.log('Serve on port', PORT)
})