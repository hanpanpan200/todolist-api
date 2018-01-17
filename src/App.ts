import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import TodoListRouter from './routes/TodoListRouter'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middleware()
    this.routes()
    this.handleError()
    this.showAvailableRouters()
  }

  private connectDatabase(): void {
    mongoose.connect('mongodb://localhost/Tododb', { useMongoClient: true }) 
  }

  private middleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
  }

  private routes() {
    let router = express.Router()
    router.get('/', (req, res, next) => {
      res.json({ message: 'Hello World!' })
    })
    this.app.use('/', router)
    this.app.use('/api', TodoListRouter)
  }

  private handleError(): void {
    this.app.use(function(req, res) {
      res.status(404).send({ url: req.originalUrl + ' not found.' })
    })    
  }

  private showAvailableRouters() {
    this.app._router.stack.forEach(function(r){
      if (r.route && r.route.path){
        console.log(r.route.path)
      }
    })
  }
}

export default new App().app