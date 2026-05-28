import { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
export default class TweetsController {

  async index() {
    const tweets = await Tweet.query().orderBy('id', 'desc')

    return tweets
  }

  async store({ request, response }: HttpContext) {

    const content = request.input('content')

    if (!content) {
      return response.badRequest({
        message: 'Contenu requis'
      })
    }
    const tweet = await Tweet.create({
      content,
      userId: 1
    })

    return response.created(tweet)
  }
}