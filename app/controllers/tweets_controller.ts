import { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'

export default class TweetsController {

  async index() {
    return await Tweet.query().orderBy('id', 'desc')
  }

  async store({ request, response }: HttpContext) {

    const content = request.input('content')
    const userId = request.input('userId')

    if (!content) {
      return response.badRequest({
        message: 'Contenu requis'
      })
    }

    if (!userId) {
      return response.badRequest({
        message: 'Utilisateur introuvable'
      })
    }

    const tweet = await Tweet.create({
      content,
      userId
    })

    return response.created({
      message: 'Tweet publié',
      tweet
    })
  }
}