import { URLModel } from './../database/model/URL'
import { config } from '../config/Constants'
import { Request, response, Response } from 'express'
import shortid from 'shortid'
import { StatusCodes } from 'http-status-codes'

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body
    const url = await URLModel.findOne({ originURL })

    if (url) {
      response.json(url)
      return
    }

    const hash = shortid.generate()
    const shortURL = `${config.API_URL}/${hash}`
    const newURL = await URLModel.create({ originURL, hash, shortURL })
    response.json(newURL)
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params
    const url = await URLModel.findOne({ hash })

    if (url) {
      response.redirect(url.originURL)
      return
    }

    response
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'URL não encontrada.' })
  }
}
