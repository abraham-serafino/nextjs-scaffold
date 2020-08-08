import sql from "lib/database"
import Joi from "@hapi/joi"

const simpleJsonApi = (schema, cb) => async (request, response) => {
  const { body, url, method } = request

  console.log(url)

  if (method !== "POST") {
    const responseBody = { error: "You must use a POST request" }
    console.error(JSON.stringify(responseBody, null, 2))
    return response.status(500).json(responseBody)
  }

  const { error } = schema.validate(body, { abortEarly: false })

  if (error) {
    const responseBody = { error: error.details }
    console.error(JSON.stringify(responseBody, null, 2))
    return response.status(500).json(responseBody)
  }

  try {
    const result = await cb(body)

    if (typeof result === "undefined") {
      console.log({ success: "" })
      return response.status(200).json({ success: "" })
    }

    else {
      console.log({ success: result })
      return response.status(200).json({ success: result })
    }

  } catch (error) {
    console.error(JSON.stringify({ error: error.message }, null, 2))
    return response.status(500).json({ error: error.message })
  }
}

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

    const user = {
      username: resultSet[0].username,
      fullname: resultSet[0].fullname,
      isAdmin: Number.parseInt(resultSet[0].is_admin)
    }

    return user
  })

export default login
