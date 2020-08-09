import Joi from "@hapi/joi"
import simpleJsonApi from "Common/simpleJsonApi"
import database from "Common/database"
import { v4 } from "uuid"

const generateUuid = v4
const sql = database()

const LoginAPI = simpleJsonApi(Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
}), async ({ username, password }) => {

    // check for username/password combination in the database
    const resultSet = await sql`
      select user_id, username, fullname, is_admin
      from users
      where username=${username} and password=${password}
      `

    if (resultSet.count !== 1) {
      throw new Error("Invalid credentials")
    }

    const TWO_HOURS_IN_MILLISECONDS = 2 * 60 * 60 * 1000
    const sessionToken = generateUuid()

    // create a session for the user
    const sessionResult = await sql`
      insert into sessions (token, user_id, session_data, expires)
        values (
          ${sessionToken},
          ${resultSet[0].user_id},
          '{}',
          ${Date.now() + TWO_HOURS_IN_MILLISECONDS}
          )
        `

    return {
      username: resultSet[0].username,
      fullname: resultSet[0].fullname,
      isAdmin: Number.parseInt(resultSet[0].is_admin),
      sessionToken,
      sessionData: {}
      }
  })

export default LoginAPI
