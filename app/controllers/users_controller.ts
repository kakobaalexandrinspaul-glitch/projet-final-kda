// import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
}
const user = await auth.use('web').authenticate()

const data = request.only(['name', 'bio', 'location'])

user.merge(data)

await user.save()

return user