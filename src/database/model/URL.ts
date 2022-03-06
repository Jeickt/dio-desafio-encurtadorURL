import { prop, getModelForClass } from '@typegoose/typegoose'

export class URL {
  @prop({ requided: true })
  hash: string

  @prop({ requided: true })
  originURL: string

  @prop({ requided: true })
  shortURL: string
}

export const URLModel = getModelForClass(URL)
