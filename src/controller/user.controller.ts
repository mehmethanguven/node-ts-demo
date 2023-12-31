import { Request, Response } from 'express'
import { omit } from 'lodash'
import { CreateUserInput } from '../schema/user.schema'
import { createUser } from '../service/user.service'
import logger from '../utils/logger'

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
) {
  try {
    console.log('createUser')
    const user = await createUser(req.body)
    return res.send(user)
  } catch (e: any) {
    logger.error(e)
    return res.status(409).send(e.message)
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  return res.send(res.locals.user)
}
