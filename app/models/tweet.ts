import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Tweet extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare content: string

  @column()
  declare image: string | null

  @column()
  declare parentId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}