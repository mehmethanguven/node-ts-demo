import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'
import { UserDocument } from './user.model'
import { boolean } from 'zod'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export interface TodoInput {
  user: UserDocument['_id']
  title: string
  completed: boolean
}

export interface TodoDocument extends TodoInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

const todoSchema = new mongoose.Schema(
  {
    todoId: {
      type: String,
      required: true,
      unique: true,
      default: () => `todo_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

const TodoModel = mongoose.model<TodoDocument>('Todo', todoSchema)

export default TodoModel
