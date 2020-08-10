import Joi from '@hapi/joi'
import { checkUsernameAndPassword } from 'User/Login.model'
import { createSession, deleteStaleSessions } from 'User/Session.model'
import simpleJsonApi from 'Common/simpleJsonApi'

const LoginAPI = simpleJsonApi(
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    userAgent: Joi.string().required()
  }),
  async ({ username, password, userAgent }) => {
    const user = await checkUsernameAndPassword(username, password)

    if (user === null) {
      throw new Error('Invalid credentials')
    }

    const { userId } = user

    deleteStaleSessions(userId, userAgent)
    return createSession(userId, userAgent)
  }
)

export default LoginAPI
