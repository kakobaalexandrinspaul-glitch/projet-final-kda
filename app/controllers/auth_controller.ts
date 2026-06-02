import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {

  async register({ request, response }) {

    const data = request.only(['username', 'email', 'password'])

    const user = await User.create({
      username: data.username,
      email: data.email,
      password: await hash.make(data.password)
    })

    return response.created({
      message: 'Compte créé',
      utilisateur: user
    })
  }
}