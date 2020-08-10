import database from "Common/database"
import Joi from "@hapi/joi"
import simpleJsonApi from "Common/simpleJsonApi"
import { TWO_HOURS_IN_MILLISECONDS } from "Common/constants"
import { v4 } from "uuid"

const generateUuid = v4
const sql = database()

const LoginAPI = simpleJsonApi(Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  userAgent: Joi.string().required()
}), async ({ username, password, userAgent }) => {

    // check for username/password combination in the database
    const resultSet = await sql`
      select user_id, username, fullname, is_admin
      from users
      where username=${username} and password=${password}
      `

    if (resultSet.count !== 1) {
      throw new Error("Invalid credentials")
    }

    const { fullname, is_admin, user_id } = resultSet[0]

    const sessionToken = generateUuid()

    // delete any stale sessions for this browser
    const deleteStale = await sql`
      DELETE FROM sessions
        WHERE user_id=${user_id} AND user_agent=${userAgent}
        `

    // create a session for the user
    const sessionResult = await sql`
      insert into sessions (token, user_id, session_data, user_agent, expires)
        values (
          ${sessionToken},
          ${user_id},
          '{}',
          ${userAgent},
          ${Date.now() + TWO_HOURS_IN_MILLISECONDS}
          )
        `

    return {
      username,
      fullname,
      isAdmin: !! Number.parseInt(is_admin),
      sessionToken,
      sessionData: {}
      }
  })

export default LoginAPI
