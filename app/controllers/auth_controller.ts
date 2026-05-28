import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    const existingUser = await User.findBy('username', data.username)

    if (existingUser) {
      return response.status(400).json({ message: "Nom d'utilisateur déjà utilisé" })
    }

    const existingEmail = await User.findBy('email', data.email)

    if (existingEmail) {
      return response.status(400).json({ message: 'Email déjà utilisé' })
    }

    const user = await User.create({
      username: data.username,
      email: data.email,
      password: await hash.make(data.password)
    })

    return response.status(201).json({
      message: 'Compte créé',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  }
}
