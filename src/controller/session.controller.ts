import { Request, Response } from 'express'
import config from 'config'
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { signJwt } from '../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body)

  if (!user) {
    return res.status(401).send('Invalid email or password')
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '')

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') }, // 15 minutes,
  )

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    'refreshTokenPrivateKey',
    { expiresIn: config.get('refreshTokenTtl') }, // 15 minutes
  )

  res.cookie('accessToken', accessToken, {
    maxAge: 900000,
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  })

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10,
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false,
  })
  // return access & refresh tokens

  return res.send({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id

  console.log('user', userId)
  const sessions = await findSessions({ user: userId, valid: true })

  return res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session

  await updateSession({ _id: sessionId }, { valid: false })

  return res.send({
    accessToken: null,
    refreshToken: null,
  })
}
