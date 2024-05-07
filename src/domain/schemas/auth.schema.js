const z =  require('zod')

const registerSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario es requerido'
  }),
  email: z
    .string({
      required_error: 'El email es requerido'
    })
    .email({
      message: 'Email invalido'
    }),
  password: z
    .string({
      required_error: 'La contrasenia es requerida'
    })
    .min(6, {
      message: 'La contrasenia debe tener minimo 6 caracteres'
    })
})

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'El email es requerido'
    })
    .email({
      message: 'El email es invalido'
    }),
  password: z
    .string({
      required_error: 'La contrasenia es requerida'
    })
    .min(6, {
      message: 'La contrasenia debe tener minimo 6 caracteres'
    })
})

module.exports = {
  registerSchema,
  loginSchema
}