const { PrismaClient } = require('@prisma/client')

const connection = new PrismaClient()

console.log('database is connected')

module.exports = connection