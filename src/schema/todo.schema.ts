import { object, number, string, TypeOf, boolean } from 'zod'

/**
 * @openapi
 * components:
 *   schema:
 *     Todo:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    completed: boolean(),
  }),
}

const params = {
  params: object({
    todoId: string({
      required_error: 'todoId is required',
    }),
  }),
}

export const createTodoSchema = object({
  ...payload,
})

export const updateTodoSchema = object({
  ...payload,
  ...params,
})

export const deleteTodoSchema = object({
  ...params,
})

export const getTodoSchema = object({
  ...params,
})

export type CreateTodoInput = TypeOf<typeof createTodoSchema>
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>
export type ReadTodoInput = TypeOf<typeof getTodoSchema>
export type DeleteTodoInput = TypeOf<typeof deleteTodoSchema>
