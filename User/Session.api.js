import { getSession, updateSession, resetExpiration } from 'User/Session.model'
import Joi from '@hapi/joi'
import simpleJsonApi from 'Common/simpleJsonApi'
import { v4 } from 'uuid'

const generateUuid = v4

const GetSessionAPI = simpleJsonApi(
  Joi.object({
    sessionToken: Joi.string().required()
  }),

  async ({ sessionToken }) => {
    const session = getSession(sessionToken)
    session.expires = resetExpiration(sessionToken, session.userAgent)

    return session
  }
)

const SaveSessionAPI = simpleJsonApi(
  Joi.object({
    sessionToken: Joi.string().required(),
    sessionData: Joi.object()
  }),

  async ({ sessionToken, sessionData }) => {
    const session = updateSession(sessionToken, sessionData)
    session.expires = resetExpiration(sessionToken, session.userAgent)

    return session
  }
)

export { GetSessionAPI, SaveSessionAPI }
