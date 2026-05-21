// import type { HttpContext } from '@adonisjs/core/http'


import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  async register({ request, response }: HttpContext) {

    const data = request.only([
      'username',
      'email',
      'password'
    ])

    console.log(data)

    return response.json({
      message: 'Compte créé avec succès',
      user: data
    })
}
