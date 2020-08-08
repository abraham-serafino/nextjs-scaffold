import postgres from "postgres"

const {
  AMSWS_POSTGRES_HOST: postgresHost = "localhost",
  AMSWS_POSTGRES_UN: postgresUsername = "postgres",
  AMSWS_POSTGRES_PW: postgresPassword = "postgres"
} = process.env

console.log({ postgresHost, postgresUsername, postgresPassword })

const sql = postgres(`postgresql://${postgresUsername}:${postgresPassword}@${postgresHost}/ams-ws`)

export default sql
