import { Request, Response } from 'express'
import {
  CreateTodoInput,
  ReadTodoInput,
  UpdateTodoInput,
} from '../schema/todo.schema'
import {
  createTodo,
  deleteTodo,
  findAndUpdateTodo,
  findTodo,
  findTodos,
} from '../service/todo.service'

export async function createTodoHandler(
  req: Request<{}, {}, CreateTodoInput['body']>,
  res: Response,
) {
  const userId = res.locals.user._id

  const body = req.body

  const todo = await createTodo({ ...body, user: userId })

  return res.send(todo)
}

export async function updateTodoHandler(
  req: Request<UpdateTodoInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id

  const todoId = req.params.todoId
  const update = req.body

  const todo = await findTodo({ todoId })

  if (!todo) {
    return res.sendStatus(404)
  }

  if (String(todo.user) !== userId) {
    return res.sendStatus(403)
  }

  const updatedTodo = await findAndUpdateTodo({ todoId }, update, {
    new: true,
  })

  return res.send(updatedTodo)
}

export async function getAllTodoHandler(req: Request, res: Response) {
  console.log('getTodosHandler', req.params)
  const todos = await findTodos()

  if (!todos) {
    return res.sendStatus(404)
  }
  console.log('todos', todos)

  return res.send(todos)
}

export async function getTodoHandler(
  req: Request<UpdateTodoInput['params']>,
  res: Response,
) {
  console.log('getTodoHandler', req.params)
  const todoId = req.params.todoId
  const todo = await findTodo({ todoId })

  if (!todo) {
    return res.sendStatus(404)
  }
  console.log('todo', todo)

  return res.send(todo)
}

export async function deleteTodoHandler(
  req: Request<UpdateTodoInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id
  const todoId = req.params.todoId

  const todo = await findTodo({ todoId })

  if (!todo) {
    return res.sendStatus(404)
  }

  if (String(todo.user) !== userId) {
    return res.sendStatus(403)
  }

  await deleteTodo({ todoId })

  return res.sendStatus(200)
}
