import { Express, Request, Response } from 'express'
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getAllProductHandler,
} from './controller/product.controller'
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controller/session.controller'
import { createUserHandler, getCurrentUser } from './controller/user.controller'
import requireUser from './middleware/requireUser'
import validateResource from './middleware/validateResource'
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema'
import { createSessionSchema } from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'
import {
  createTodoSchema,
  deleteTodoSchema,
  getTodoSchema,
  updateTodoSchema,
} from './schema/todo.schema'
import {
  createTodoHandler,
  deleteTodoHandler,
  getAllTodoHandler,
  getTodoHandler,
  updateTodoHandler,
} from './controller/todo.controller'

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post('/api/users', validateResource(createUserSchema), createUserHandler)

  app.get('/api/me', requireUser, getCurrentUser)

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler,
  )

  app.get('/api/sessions', requireUser, getUserSessionsHandler)

  app.delete('/api/sessions', requireUser, deleteSessionHandler)

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */

  app.post(
    '/api/products',
    [requireUser, validateResource(createProductSchema)],
    createProductHandler,
  )

  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler,
  )

  app.get(
    '/api/products/:productId',
    [requireUser, validateResource(getProductSchema)],
    getProductHandler,
  )
  app.get('/api/products', requireUser, getAllProductHandler)

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler,
  )

  /**
   * @openapi
   * '/api/todos/{todoId}':
   *  get:
   *     tags:
   *     - Todos
   *     summary: Get a single todo by the todoId
   *     parameters:
   *      - name: todoId
   *        in: path
   *        description: The id of the todo
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Todo'
   *       404:
   *         description: Todo not found
   */

  app.post(
    '/api/todos',
    [requireUser, validateResource(createTodoSchema)],
    createTodoHandler,
  )
  app.put(
    '/api/todos/:todoId',
    [requireUser, validateResource(updateTodoSchema)],
    updateTodoHandler,
  )

  app.get(
    '/api/todos/:todoId',
    [requireUser, validateResource(getTodoSchema)],
    getTodoHandler,
  )
  app.get('/api/todos', requireUser, getAllTodoHandler)

  app.delete(
    '/api/todos/:todoId',
    [requireUser, validateResource(deleteTodoSchema)],
    deleteTodoHandler,
  )
}

export default routes
