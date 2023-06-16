import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import TodoModel, { TodoDocument, TodoInput } from '../models/todo.model'
import { databaseResponseTimeHistogram } from '../utils/metrics'

export async function createTodo(input: TodoInput) {
  const metricsLabels = {
    operation: 'createTodo',
  }

  const timer = databaseResponseTimeHistogram.startTimer()
  try {
    const result = await TodoModel.create(input)
    timer({ ...metricsLabels, success: 'true' })
    return result
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' })
    throw e
  }
}

export async function findTodos() {
  return TodoModel.find()
}

export async function findTodo(
  query: FilterQuery<TodoDocument>,
  options: QueryOptions = { lean: true },
) {
  console.log('findTodo')
  const metricsLabels = {
    operation: 'findTodo',
  }

  const timer = databaseResponseTimeHistogram.startTimer()
  try {
    const result = await TodoModel.findOne(query, {}, options)
    timer({ ...metricsLabels, success: 'true' })
    return result
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' })

    throw e
  }
}

export async function findAndUpdateTodo(
  query: FilterQuery<TodoDocument>,
  update: UpdateQuery<TodoDocument>,
  options: QueryOptions,
) {
  return TodoModel.findOneAndUpdate(query, update, options)
}

export async function deleteTodo(query: FilterQuery<TodoDocument>) {
  return TodoModel.deleteOne(query)
}
