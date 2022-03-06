import { MongoConnection } from './database/MongoConnection'
import { URLController } from './controller/URLController'
import express, { Request, Response, NextFunction } from 'express'

const api = express()

api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

// api.get('/test', (req: Request, res: Response, next: NextFunction) => {
//   res.json({ success: true })
// })

api.listen(3000, () => {
  console.log('Aplicação sendo executada na porta 3000.')
})
