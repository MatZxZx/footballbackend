const { z } = require('zod')

const playerSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es requerido'
    }),
  lastname: z
    .string({
      required_error: 'El apellido es requerido'
    }),
  price: z
    .string({
      required_error: 'El precio es requerido'
    }),
  position: z
    .string({
      required_error: 'La posicion es requerida'
    })
})

module.exports = {
  playerSchema
}