import React, { Fragment, useState } from "react"

// You can also make up your own rules! :)
const required = (value) => {
  return !value ? "required" : null
}

const Validation = ({ value, rules = [], apply = true }) => {
  if (rules && ! Array.isArray(rules)) {
    throw new Error("Rules prop must be an array")
  }

  return apply ? (

    <ul className="validationError" style={{
      fontSize: "0.75em",
      color: "red",
      listStyle: "none"
      }}>

      {rules.map((rule, i) => (<li key={i}>{rule(value)}</li>))}

    </ul>

    ) : null
}

// import { Validation, required } from "./Validation.jsx"

const Example = () => {
  const [state, setState] = useState({
    name: "",
    shouldApplyValidation: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, shouldApplyValidation: true })
  }

  const handleChangeName = (e) => {
    setState({ ...state, name: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
        <input value={state.name} onChange={handleChangeName} />

        <Validation
            rules={[required]}
            value={state.name}
            apply={state.shouldApplyValidation}
            />
    </form>
  )
}

export {
  Validation,
  required
  }
