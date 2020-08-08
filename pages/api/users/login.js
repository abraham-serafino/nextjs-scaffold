import Joi from "@hapi/joi"
import simpleJsonApi from "lib/simpleJsonApi"
import sql from "lib/database"

const login = simpleJsonApi(Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
}), async ({ username, password }) => {

    const resultSet = await sql`
      select username, fullname, is_admin
      from users
      where username=${username} and password=${password}
    `

    if (resultSet.count !== 1) {
      throw new Error("Invalid credentials")
    }

    return {
      username: resultSet[0].username,
      fullname: resultSet[0].fullname,
      isAdmin: Number.parseInt(resultSet[0].is_admin)
    }
  })

export default login
