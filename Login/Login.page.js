import { APP_NAME } from "Common/constants"
import bindModel from "Common/bindModel"
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import Joi from "@hapi/joi"
import Router from "next/router"
import simpleJsonClient from "Common/simpleJsonClient"
import storage from "Common/storage"
import { useEffect, useState } from "react"
import Validation from "Common/JoiValidation"

const LoginPage = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    shouldApplyValidation: false,
    errorDetails: []
    })

  const { username, password, shouldApplyValidation, errorDetails } = state

  useEffect(() => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
      })

    const { error: { details = [] } = {} } =
      schema.validate({ username, password }, { abortEarly: false })

    setState({ ...state, errorDetails: details })

  }, [username, password])

  const { model } = bindModel([state, setState])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ((errorDetails || []).length <= 0) {
      const { error, result } = await simpleJsonClient("/api/user/login",
        { username, password })

      console.log(error)

      if (result) {
        storage(APP_NAME).set("session", result)

        if (result.isAdmin) {
          Router.push("/employees")
        }

        else {
          Router.push("/reviews")
        }
      }
    }

    else {
      setState({ ...state, shouldApplyValidation: true })
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row form>
        <FormGroup>
          <Label for="username">Username</Label>

          <Input type="text" name="username" id="username"
            {...model("username")} />

          <Validation label="username"
            {...{ errorDetails, shouldApplyValidation }}
            />
        </FormGroup>
      </Row>

      <Row form>
        <FormGroup>
          <Label for="password">Password</Label>

          <Input type="password"
                name="password"
                id="password"
                {...model("password")}
                />

            <Validation label="password"
              {...{ errorDetails, shouldApplyValidation }}
              />

        </FormGroup>
      </Row>

      <Row form>
        <Button>Login</Button>
      </Row>
    </Form>
    )
}

export default LoginPage
