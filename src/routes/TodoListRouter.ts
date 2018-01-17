import { Router } from 'express'
import {
  getAllTasks,
} from '../controllers/TodoListController'

class TodoListRouter {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private init(): void {
    this.router.get('/tasks', getAllTasks)
  }
}

export default new TodoListRouter().router