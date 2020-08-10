import database from 'Common/database'

const sql = database()

const checkUsernameAndPassword = async (username, password) => {
  // check for username/password combination in the database
  const resultSet = await sql`
    select user_id, username, fullname, is_admin
    from users
    where username=${username} and password=${password}
    `

  console.log(resultSet)

  if (resultSet.count !== 1) {
    return null
  }

  const { fullname, is_admin, user_id } = resultSet[0]

  return {
    fullname,
    isAdmin: is_admin,
    userId: user_id
  }
}

export { checkUsernameAndPassword }
