import database from 'Common/database'
import { TWO_HOURS_IN_MILLISECONDS } from 'Common/constants'
import { v4 } from 'uuid'

const generateUuid = v4
const sql = database()

const resetExpiration = async (sessionToken, userAgent) => {
  const newExpiration = Date.now() + TWO_HOURS_IN_MILLISECONDS

  // reset token expiration (add 2 more hours)
  const resultSet = await sql`
    UPDATE sessions
      SET expires = ${newExpiration}
      WHERE token=${sessionToken} AND user_agent=${userAgent}
      `

  console.log(resultSet)

  // we will not reach this line if the preceding query throws an exception
  return newExpiration
}

const getSession = async sessionToken => {
  const resultSet = await sql`
    SELECT
      s.session_id,
      s.user_id,
      s.session_data,
      s.token,
      s.user_agent,
      u.fullname,
      u.username,
      u.is_admin
    FROM sessions s
      JOIN users u
        ON s.user_id = s.user_id
    WHERE s.token = ${sessionToken}
    `

  console.log(resultSet)

  if (resultSet.count !== 1) {
    throw new Error(
      `Could not find a unique session with token ${sessionToken}`
    )
  }

  const {
    session_id: sessionId,
    user_id: userId,
    session_data: sessionData,
    token,
    user_agent: userAgent,
    fullname,
    username,
    is_admin: isAdmin
  } = resultSet[0]

  return {
    sessionData,
    sessionToken: token,
    userAgent,
    user: {
      fullname,
      username,
      isAdmin: !!Number.parseInt(isAdmin)
    }
  }
}

const createSession = async (userId, userAgent) => {
  const sessionToken = generateUuid()

  // create a session for the user
  const resultSet = await sql`
    insert into sessions (token, user_id, session_data, user_agent, expires)
      values (
        ${sessionToken},
        ${userId},
        '{}',
        ${userAgent},
        ${Date.now() + TWO_HOURS_IN_MILLISECONDS}
        )
      `

  console.log(resultSet)

  return getSession(sessionToken)
}

const updateSession = async (sessionToken, sessionData) => {
  const resultSet = await sql`
    UPDATE sessions
      SET session_data=${JSON.stringify(sessionData || {})}
      WHERE token=${sessionToken}
      `

  console.log(resultSet)

  return getSession(sessionToken)
}

const deleteStaleSessions = async (userId, userAgent) => {
  console.log(userId, userAgent)

  // delete any stale sessions for this browser
  const resultSet = await sql`
    DELETE FROM sessions
      WHERE user_id=${userId} AND user_agent=${userAgent}
      `

  console.log(resultSet)
}

export {
  resetExpiration,
  getSession,
  createSession,
  updateSession,
  deleteStaleSessions
}
